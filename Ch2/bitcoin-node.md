# Installing Bitcoin Core on MacOS

If you don’t have XCode installed you can download it from here;

```
https://developer.apple.com/xcode/
https://developer.apple.com/download/
```

Note that this installation can take hours, depends on your internet connection.  Now that we have XCode, download the Command Line Tools for Xcode;

```
> xcode-select --install
```

Now that we have the Command Line Tools, we will install Homebrew and wget tools, following these commands;

```
> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

> brew install wget
```

With Homebrew and wget installed we are able to install the rest of the needed dependencies for Bitcoin Core:

```
> brew install automake berkeley-db4 libtool boost miniupnpc openssl pkg-config protobuf python qt libevent qrencode librsvg
```

## Installing Bitcoin Core

At this point we have the needed tools and dependencies installed and we can clone the Bitcoin Code project, compile and run it;

```
> git clone https://github.com/bitcoin/bitcoin.git
> cd bitcoin/
```

Now, we can build the Berkeley DB version 4, used by the Bitcoin Core node:

```
> ./contrib/install_db4.sh .
```

Continue the installation;

```
> ./autogen.sh
> ./configure 
> make
> make check && sudo make install
```

There are two tools available for us: bitcoind and Bitcoin-CLI.

bitcoind (Bitcoin Daemon) implements the Bitcoin protocol for remote procedure call (RPC) use.  Once it’s install we can make API calls.  There is a list of all the API calls listed here: https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_Calls_list
Bitcoin-CLI (Bitcoin command line interface) - unable us to interact with Bitcoin Core daemon.

To ensure the installation went well we can check that Bitcoin Daemon and Bitcoin-CLI are configured and working as expected:

```
> which bitcoind
> which bitcoin-cli
```

Returns the location of the bitcoind and bitcoin-cli:
```
/usr/local/bin/bitcoind
/usr/local/bin/bitcoin-cli
```
## Configure & Compiling Bitcoin Core

In order to configure the node, You can find the configuration files location by typing in Termina the following command:

```
> bitcoind -printtoconsole
```
```
> vim /[path]/.bitcoin/bitcoin.conf
```

Paste the following configurations;

```
alertnotify=myemailscript.sh "Alert: %s" 
prune=3000
maxconnections=10
dbcache=150 
maxmempool=100 
maxsendbuffer=500
maxreceivebuffer=2000
txindex=0
```

Starting the Bitcoin Core Demon
```
> bitcoind -printtoconsole
```

While the process is running, open a second new Terminal Window and you will be able to query the bitcoind interact with the APIs via the bitcoin-cli. 

```
> bitcoin-cli --help # outputs list of command-line options. 
> bitcoin-cli help # outputs list of RPC commands when the daemon is running.
> bitcoin-cli help getblockhash  # get help on specific API, for instance “getblockhash”;
```


