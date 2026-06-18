git pull
npm run build
cd build/client/images
ln -s /mnt/manaprobe/images/cards .
ln -s /mnt/manaprobe/images/sets .
#sudo systemctl restart  manaprobe-react
service manaprobe_react restart