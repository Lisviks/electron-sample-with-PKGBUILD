# This is an example PKGBUILD file. Use this as a start to creating your own,
# and remove these comments. For more information, see 'man PKGBUILD'.
# NOTE: Please fill out the license field for your package! If it is unknown,
# then please put 'unknown'.

# Maintainer: Your Name <youremail@domain.com>
pkgname=electron-sample-with-PKGBUILD
pkgver=1.0.0
pkgrel=1
epoch=
pkgdesc="electron sample"
arch=("any")
url="https://github.com/Lisviks/electron-sample-with-PKGBUILD"
license=('MIT')
groups=()
depends=()
makedepends=(git zip unzip npm)
checkdepends=()
optdepends=()
provides=()
conflicts=()
replaces=()
backup=()
options=()
install=
changelog=
source=("git+https://github.com/Lisviks/electron-sample-with-PKGBUILD.git")
noextract=()
md5sums=("SKIP")
validpgpkeys=()

prepare() {
	cd "${srcdir}/${pkgname}"
	npm install
}

build() {
	cd "${srcdir}/${pkgname}"
	npm run make
	cd "out/make/zip/linux/x64"
	unzip -d ${pkgname} electron-sample-linux-x64-1.0.0.zip
}

package() {
	cd "${srcdir}/${pkgname}/out/make/zip/linux/x64/${pkgname}"
	mv electron-sample-linux-x64 electron-sample
	mkdir -p ${pkgdir}/opt/electron-sample
	cp -r electron-sample ${pkgdir}/opt
	cd "electron-sample/resources/app"
	install -Dm 0777 -t ${pkgdir}/usr/share/applications electron-sample.desktop
}
