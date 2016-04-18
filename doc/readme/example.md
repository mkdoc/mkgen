# Example

Append the default generator message:

```shell
mkcat README.md | mkmsg | mkout
```

Append a custom message:

```shell
mkcat README.md | mkmsg -m "Commit: $(git rev-parse HEAD)" | mkout
```

Prepend a custom message:

```shell
mkcat README.md | mkmsg -p -m "Commit: $(git rev-parse HEAD)" | mkout
```

