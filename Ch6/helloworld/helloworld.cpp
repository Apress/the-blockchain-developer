#include <eosiolib/eosio.hpp>
using namespace eosio;

class helloworld : public contract {
  public:
      using contract::contract;
      [[eosio::action]]
      void hello( name user ) {
         print( "World: User: ", user);
      }
};

EOSIO_DISPATCH( helloworld, (hello))
