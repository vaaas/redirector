#!/bin/sh
scp -P 2022 *deb root@sexualise.it:/root
ssh -p 2022 root@sexualise.it 'apt install --no-install-recommends --no-install-suggests -f ./*deb && rm -v *deb'
\rm -v -- ./*deb
