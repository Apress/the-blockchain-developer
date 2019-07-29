# Installing EOS full node

Requirements are listed here: https://developers.eos.io/eosio-nodeos/docs/install-nodeos

```
> git clone https://github.com/EOSIO/eos --recursive 
> cd eos 
> ./eosio_build.sh #takes about 30 mins to an hour.
```

Check that the demon is working correctly;

```
> cd build/programs/nodeos
> ./nodeos -h #list of commands
```

Run the EOS node daemon;

```
> ./nodeos -e -p eosio --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin
```
