---
layout: default
permalink: /onions/
---

Hyper-onion-ization
--------------


This file is my curated list (based on [meeDamian's list](https://github.com/meeDamian/onions)) of all things Tor.  It all assumes:

* Tor is installed
* running in background, and
* listening on `127.0.0.1:9050` or `127.0.0.1:9151` depending on your OS

My sites
--------------

Here are my own ``.onion`` sites

| clearnet/name    | onion address
|------------------|:--------------
| My Onions mirror | http://nlboxqa32a4mja67wgnowska7gsnhyonu6dzry3whd6cba277hkbmcid.onion/
| My Blog          | http://nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion/
| My Travel Blog   | http://itinzvrq4nfgard62w7dbcxuhal33c7m5zvsrqwxynkpahkertuy5sad.onion/
| UFLabs Site      | http://uflabsykocgfkhkxo6fq4fzike4cxpq2dhcqsj3kosgprpkc6hva2iid.onion/


Popular and on Tor
--------------

Table below contains a list of `.onion` addresses for some more popular clearnet services.

| clearnet/name    | onion address
|------------------|:--------------
| BBC News         | https://www.bbcnewsv2vjtpsuy.onion
| Blockstream.info | http://explorerzydxu5ecjrkwceayqybizmpjjznk5izmitf2modhcusuqlid.onion
| DuckDuckGo.com   | https://3g2upl4pq6kufc4m.onion
| Facebook.com     | https://www.facebookcorewwwi.onion
| Keybase.io       | http://keybase5wmilwokqirssclfnsqrjdsi7jdir5wy7y7iu3tanwmtp6oid.onion
| NYTimes.com      | https://www.nytimes3xbfgragh.onion
| ProtonMail.com   | https://protonirockerxow.onion
| ThePirateBay.org | http://uj3wazyk5u4hnvtk.onion
| WasabiWallet.io  | http://wasabiukrxmkdgve5kynjztuovbg43uxcbcxn6y2okcrsg7gb6jdmbad.onion
| Brave Browser    | https://brave5t5rjjg3s6k.onion/

Bitcoin Git Repos
-----------------

Thanks to [@laanwj], Bitcoin and some orbiting repos (`lnd`, `c-lightning`, `eclair`, Bitcoin meta stuff) are mirrored as a Tor hidden service at:

[@laanwj]: https://github.com/laanwj

```
http://nxshomzlgqmwfwhcnyvbznyrybh3gotlfgis7wkv7iur2yj2rarlhiad.onion
```

While all necessary instructions are on [the website above], here's the **tl;dr:**

[the website above]: http://nxshomzlgqmwfwhcnyvbznyrybh3gotlfgis7wkv7iur2yj2rarlhiad.onion

#### Fresh clone of Bitcoin

```bash
git -c http.proxy=socks5h://127.0.0.1:9050 clone http://nxshomzlgqmwfwhcnyvbznyrybh3gotlfgis7wkv7iur2yj2rarlhiad.onion/git/bitcoin.git
cd bitcoin
git config --add remote.origin.proxy "socks5h://127.0.0.1:9050"
```

#### Change `origin` of lnd to Tor

```bash
cd lnd
git remote set-url master http://nxshomzlgqmwfwhcnyvbznyrybh3gotlfgis7wkv7iur2yj2rarlhiad.onion/git/lnd.git
git config --add remote.master.proxy "socks5h://127.0.0.1:9050"
git remote add github git@github.com:lightningnetwork/lnd.git
```

GnuGPG
------

To use `hkps://keys.openpgp.org` through a hidden service, to `~/.gnupg/gpg.cong` file add the following line:

```
keyserver hkp://zkaan2xfbuxia2wpf7ofnkbz6r5zdbbvxbunvp5g2iebopbfc4iqmbad.onion
```

If you already have a `keyserver …` line there, replace it.

[Onion source](https://keys.openpgp.org/about/usage). Should work on MacOS & Linux alike.

Keybase
-------

Keybase talks about their usage of Tor in more detail on [this page] [(clearnet)], but here's a **tl;dr:**

[this page]: http://keybase5wmilwokqirssclfnsqrjdsi7jdir5wy7y7iu3tanwmtp6oid.onion/docs/command_line/tor
[(clearnet)]: https://keybase.io/docs/command_line/tor

#### CLI

Tor hidden address is used by the CLI internally by default.

Enabling CLI's communication with **non-keybase** services via Tor can be done with either:

```bash
keybase config set tor.mode leaky
keybase config set tor.mode strict
```

> **Note:** both modes are fairly broken as of 2019-08-23 & `v4.3.2`

#### Web

You can visit Keybase through their hidden service at:

```
http://keybase5wmilwokqirssclfnsqrjdsi7jdir5wy7y7iu3tanwmtp6oid.onion
```

#### Desktop

You can proxy all desktop client traffic through Tor by setting PROXY to `SOCKS5`,
`127.0.0.1`, and `9050` in `Keybase -> Settings -> Advanced`.

Honorable Mentions
------------------

These services are known for using Tor either extensively, or exclusively:

* JoinMarket
* Samourai Wallet & Sentinel
* Wasabi Wallet

LNCM
----
A Chiang Mai-based Lightning Network oriented developer community.  Here's some of our onions:

#### Websites

Websites related to LNCM

| clearnet/name    | onion address
|------------------|:--------------
| LNCM.io ([@nolim1t TorV2 Mirror](https://github.com/nolim1t))      | http://lncm5rjtcacoc6yf.onion/


#### ⛓ Bitcoin nodes

| type    | addresses
|---------|:----------
| mainnet | `keh2i6kkjs7tqahpv7jgj6ifb3r7sdnge4ickqghnyedhp3jjwu7mlad.onion:8333` (nolim1t)<br />`34qk27n4it7pdkqmld5sbmxwolmietclcc6d35mz6cmskxm7mo4ykzid.onion:8333` (nolim1t)
| testnet | `lncmdmfl674xg3oa.onion:18333`<br> `lncmdmrpdhoeraa5.onion:18333`
| regtest | N/A at the moment

#### ⚡️ Lightning nodes

| type    | connection string
|---------|:------------------
| mainnet | [`02e64be984a252d82d71a84f0f2bb8be375207a0862e827dacb290977eca84078f@2qtnbs2vwsmhdalmyd5ftmxp6w6clepaawyys6ndmneb6g2qxn7bkpad.onion:9735`](https://1ml.com/node/02e64be984a252d82d71a84f0f2bb8be375207a0862e827dacb290977eca84078f)
| mainnet | [`03f1b1b79212e5918177f357e8db1eb60f163d7140bcd818444e2dae75884dd3e0@2u4i4ofm4owow576qeii3s5qz3r7z272obaeyzouehkdyr4oy54wkpad.onion:9736`](https://1ml.com/node/03f1b1b79212e5918177f357e8db1eb60f163d7140bcd818444e2dae75884dd3e0)
| mainnet | [`02d22dd92ceefe7a23fdd59f62278813aef9276f1a3c2e82a7e0329b0f732e9e06@r2j6jijh3hpffje4vshg2vo3il2fd5ulupmb7u74douezuq2yrj3kvyd.onion:9735`](https://1ml.com/node/02d22dd92ceefe7a23fdd59f62278813aef9276f1a3c2e82a7e0329b0f732e9e06)
| testnet | [`03be84a5493470812e4d486513d082c3063841531f3938a8d3646327a332a2c477@roq7ltvhifbccl54xivrihs32ibw2pdhihac6v2orx3bosapl447k3qd.onion:9735`](https://1ml.com/testnet/node/03be84a5493470812e4d486513d082c3063841531f3938a8d3646327a332a2c477) (decommissioned temporarily)
| testnet | [`02e888295220a5254a5f0486538dc77c0357ee9727db2e9173e6a76646d4aa332e@hxz6xeqvmi5s6rbqqtgu4qkihgdkwbnc7h2vnsn3qkahhffau6afbsyd.onion:9733`](https://1ml.com/testnet/node/02e888295220a5254a5f0486538dc77c0357ee9727db2e9173e6a76646d4aa332e) (Seems to be down)
| regtest | N/A at the moment


#### ⚡️ Altruistic Watchtowers

| type    | connection string
|---------|:------------------
| mainnet | `03a5fbe0399de22562e6b470ac65f73ec50b45115935f2be1e89a884e5dfa3c6d8@nwehukwznotaxcpagoycd6t6eipyrvnnq245ehenxzl5g7maq5f2qaqd.onion:9911`

Install Tor
-----------
The easiest ways to install Tor I've found so far.

### MacOS

```bash
brew update && brew install tor && brew service start tor && tor --version
```

> **Note:** `torrc` is located in `/usr/local/etc/tor/torrc` by default.

### Debian/Ubuntu

That includes Raspbian on the more capable RBPs (not zero).

```bash
sudo apt update && sudo apt install tor && sudo service tor@default restart && tor --version
```

> **Note:** `torrc` is located in `/etc/tor/torrc` by default.


Internet/Services
--------------

| clearnet/name          | onion address
|------------------------|:------------------
| bitvps                 | [bitvpsj2ojxo7faned27wmpqiss3pny7m7bptwtnegl7fswjrxwtmxid.onion](http://bitvpsj2ojxo7faned27wmpqiss3pny7m7bptwtnegl7fswjrxwtmxid.onion/)


Interesting Topics
--------------

| clearnet/name          | onion address
|------------------------|:------------------
| dark.fail              | [darkfailllnkf4vf.onion](http://darkfailllnkf4vf.onion/)
| Dreddit                | [dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion](http://dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion/)
| DarkTea (Git Repos)    | [it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion](http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/)
| Psychonaut Wiki        | [vvedndyt433kopnhv6vejxnut54y5752vpxshjaqmj7ftwiu6quiv2ad.onion](http://vvedndyt433kopnhv6vejxnut54y5752vpxshjaqmj7ftwiu6quiv2ad.onion/)
| Hidden WIki            | [hiddenwiki7wiyzr.onion](http://hiddenwiki7wiyzr.onion/)


Other
-------

Here are other ```.onions``` you can use which don't fall into any of the above categories

* [Unassigned (possibly for LNCM purposes)](http://lncm5ceegpyrc2ts.onion/)
