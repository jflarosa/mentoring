# CI/CD Documentation

How `creative-viewer` gets built and deployed. The pipeline is a trimmed-down port of
the `dsp-dashboard` one: **staging only** — no production environment and no
ephemeral (per-PR) environments.

## Workflow

Every push to `master` builds a Docker image and rolls it out to the shared
staging environment:

<https://creative-viewer.dsp-stage.adikteev.com>

A redeploy can also be triggered by hand from the
`Deployment Staging` workflow (`workflow_dispatch`).

There is a single image tag, `latest`. The Helm chart stamps
`.Release.Revision` on the pod template, so each `helm upgrade` rolls the pods
even though the tag never changes — combined with `imagePullPolicy: Always`
that is what makes the fresh image actually get pulled.

## Build

`creative-viewer.Dockerfile` is a two-stage build:

1. `node:24-alpine` runs `npm ci` then `npm run build -- --mode $environment`
   (`environment` defaults to `staging`).
2. `nginx:1.28.0` serves the resulting `dist/`, with
   `infrastructure/nginx/default.conf` adding the SPA fallback
   (`try_files $uri $uri/ /index.html`).

Build-time configuration lives in `.env.staging`. Vite only exposes
`VITE_`-prefixed variables, and it inlines them into the bundle at build time —
so that file holds public configuration only, never a secret.

## Infrastructure

`infrastructure/creative-viewer/` is a Helm chart with three templates:

| Template             | Resource                   | Namespace      |
| -------------------- | -------------------------- | -------------- |
| `deployment.yaml`    | `Deployment` (1 replica)   | `staging`      |
| `service.yaml`       | `Service` (port 80)        | `staging`      |
| `ingress-route.yaml` | Traefik `IngressRoute`     | `loadbalancer` |

Values are in `chart-values/staging.yaml`. The host
`creative-viewer.dsp-stage.adikteev.com` is a sub-domain of `dsp-stage` on purpose:
the existing `wildcard-dsp-stage-adikteev-com-tls` certificate already covers
it, so no new certificate is needed.

The `IngressRoute` carries `helm.sh/resource-policy: keep` so a
`helm uninstall` cannot take the public hostname down with it.

Deploying by hand is the same command the workflow runs:

```sh
helm upgrade --install --debug \
  --namespace staging \
  --values ./infrastructure/creative-viewer/chart-values/staging.yaml \
  creative-viewer \
  ./infrastructure/creative-viewer \
  --set-string tag=latest
```

## GitHub Actions

### `build.yaml` — Build & Push Docker Image

Reusable workflow (`workflow_call` only). Builds the image and pushes it to
`registry.adikteev.io/creative-viewer-staging`. Inputs: `docker-file`,
`docker-image-name`, `environment`, `tag`.

### `staging-deployment.yaml` — Deployment Staging

Triggered on `push` to `master` and on `workflow_dispatch`. Calls `build.yaml`,
then runs the Helm deployment above.

Both workflows run on the `gha-rtg-adikteev-runners` self-hosted runners, which
are expected to be already authenticated against `registry.adikteev.io` and the
Kubernetes cluster.
