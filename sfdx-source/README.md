# Deploy Source to Scratch Org

## Create a new scratch org

```bash
sf org create scratch -d -a MyScratchOrg -f sfdx-config/scratch-def.json
```

## Deploy source to the new scratch org

```bash
sf project deploy start
```

## Open the scratch org

```bash
sf org open
```
