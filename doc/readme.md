# Generator

<? @include readme/badges.md ?>

> Append or prepend a message

<? @include {=readme} introduction.md install.md ?>

## Usage

<? @source {javascript=s/\.\.\/index/mkgen/gm} usage.js ?>

<? @exec mkapi index.js --title=API --level=2 ?>
<? @include {=readme} license.md links.md ?>
