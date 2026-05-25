git pull
npm run build
cd build/client/images
ln -s ~/images/cards .
ln -s ~/images/sets .
sudo systemctl restart  manaprobe-react
