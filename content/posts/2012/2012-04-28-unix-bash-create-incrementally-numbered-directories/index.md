---
authors:
- max
blog: maxrohde.com
categories:
- linux
date: "2012-04-28"
title: 'UNIX Bash: Create incrementally numbered directories'
---

**The Problem**

You would like to be able to create UNIX directories with numerical names, which increase incrementally, for instance:

```


0000

0001

0002

0003

etc.

```

**The Solution**

Just execute the following bash script in a directory, which contains at least the subdirectory '0000'. The script will create a new directory with a numerical name with trailing zeros precisely being the last created directories name +1.

```bash


echo "=== Create new deployment dir ==="

lastdir=$(ls -d [0-9][0-9][0-9][0-9] | tail -1)

myvalue=$lastdir
newvalue="0"
while [ "$newvalue" != "$lastvalue" ]
do
newvalue="$(echo $myvalue | sed 's/^0//')"
lastvalue=$myvalue
myvalue=$newvalue
done

echo "Last created dir: $lastdir"

lastdirnr=$newvalue
newdirnr=$((($lastdirnr) + 1))
newdir=$(printf "%04u" $newdirnr)

echo "Create new dir: $newdir"

mkdir $newdir

```

**References**

[How do I strip leading zeros](http://www.askdavetaylor.com/how_do_i_strip_leading_zeroes_for_math_in_a_shell_script.html)

(there was one more post I got the 'ls' and 'printf' part from but I cannot find it at the moment :( )
