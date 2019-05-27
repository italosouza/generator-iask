#!/bin/sh

cwd="$PWD"

normalize() 
{
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9._-]//g'
}

main()
{
  for f in *; do
    if [ -d ${f} ]; then
      build $f
    fi
  done
}

build() 
{
  organization="italosouza"
  dir="$(basename "$1")"
  if [ $dir = "config" ]; then
    return 0
  fi

  cd "$dir" || return 1
  image="$organization/$(normalize "$(basename "$PWD")")"
  docker build -t $image .
  cd ..
}


main
