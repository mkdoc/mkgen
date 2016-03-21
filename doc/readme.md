# Message

<? @include readme/badges.md ?>

> Append or prepend a message

By default appends a message to a stream, use the `message` option to change the message; to prepend set the `prepend` option.

When no message is given the default generator message is used.

<? @include {=readme} install.md ?>

## Usage

Create the stream and write a [commonmark][] document:

<? @source {javascript=s/\.\.\/index/mkmsg/gm} usage.js ?>

<? @include {=readme} help.md ?>

<? @exec mkapi index.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>
