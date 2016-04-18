# Message

<? @include readme/badges.md ?>

> Append or prepend a message

By default appends a message to a stream, use the `message` option to change the message; to prepend set the `prepend` option.

When no message is given the default generator message is used.

<? @include {=readme} install.md ?>

***
<!-- @toc -->
***

<? @include {=readme} usage.md example.md help.md ?>

<? @exec mkapi index.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>
