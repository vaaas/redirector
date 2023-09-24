#!/bin/sh

basename=redirector
version=`date '+%s'` #using timestamp as version
arch=amd64
dirname="$basename"_"$version"_"$arch"

# create directories
mkdir -vp $dirname/usr/bin/ $dirname/etc/systemd/system $dirname/etc/redirector

# build the app
npm run build
chmod +x $basename

# put binary in the correct directory
cp -v $basename $dirname/usr/bin

# systemd service
cat << EOF > $dirname/etc/systemd/system/$basename.service
[Unit]
Description=$basename
After=network-online.target
Wants=network-online.target

[Service]
Restart=always
ExecStart=/usr/bin/node /usr/bin/redirector --host 127.0.0.1 --port 2000 --urls /etc/redirector/urls.txt

[Install]
WantedBy=default.target
EOF

# sample urls
cat << EOF > $dirname/etc/redirector/urls.txt
google	https://google.com
EOF

# make DEBIAN directory
mkdir $dirname/DEBIAN

# control file
cat << EOF > $dirname/DEBIAN/control
Package: $basename
Version: $version
Architecture: $arch
Maintainer: Vasileios Pasialiokis <whiterocket@outlook.com>
Description: Simple redirector
Depends: nodejs
EOF

chmod 755 $dirname/DEBIAN # correct permissions for the control file

# postinst hook
cat << EOF > $dirname/DEBIAN/postinst
#!/bin/sh
systemctl enable --now redirector
systemctl restart redirector
EOF

chmod +x $dirname/DEBIAN/postinst

# make the deb file
dpkg-deb --build --root-owner-group $dirname

# cleanup
rm -rf $dirname
