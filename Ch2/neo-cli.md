# Installing Bookkeeping-Node-Deployment on Ubuntu 16.04

```
> sudo sh -c 'echo "deb [arch=amd64] https://apt-mo.trafficmanager.net/repos/dotnet-release/ trusty main" > /etc/apt/sources.list.d/dotnetdev.list'
> sudo apt-key adv --keyserver apt-mo.trafficmanager.net --recv-keys 417A0893
> sudo apt-get update
> sudo apt-get install dotnet-dev-1.0.4
```

Errors during installation: Depends: dotnet-sharedframework-microsoft.netcore.app-1.0.4, dotnet-sharedframework-microsoft.netcore.app-1.1.1
Workaround:

```
> sudo sh -c 'echo "deb [arch=amd64] https://apt-mo.trafficmanager.net/repos/dotnet-release/ xenial main" > /etc/apt/sources.list.d/dotnetdev.list'
> sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 417A0893
> sudo apt-get update
```

Then I was able to install dotnet-dev-1.0.4 and went back to:

```
> sudo sh -c 'echo "deb [arch=amd64] https://apt-mo.trafficmanager.net/repos/dotnet-release/ trusty main" > /etc/apt/sources.list.d/dotnetdev.list'
```

Check if the dotnet core environment is successfully installed with the following command: 

```
> mkdir hwapp
> cd hwapp
> dotnet new xunit --framework netcoreapp1.1
> dotnet restore hwapp.csproj
> dotnet run
> cd ..
> rm -rf hwapp/
```

## Bookkeeping Node Deployment

```
> sudo apt-get install libleveldb-dev sqlite3 libsqlite3-dev libunwind8-dev
> git clone https://github.com/neo-project/neo-cli
> git branch -a
> git checkout v3.0
> git checkout head
```

In order to run, you need version 1.1.2 of .Net Core. Download the SDK binary.
https://www.microsoft.com/net/download/linux-package-manager/ubuntu16-04/sdk-2.1.300

```
> dotnet restore
> dotnet publish -c Release
```

Returns location of published dll

  neo-cli -> /home/ubuntu/neo-cli/neo-cli/bin/Release/netcoreapp2.0/neo-cli.dll .
  neo-cli -> /home/ubuntu/neo-cli/neo-cli/bin/Release/netcoreapp2.0/publish/

```
> dotnet /home/ubuntu/neo-cli/neo-cli/bin/Release/netcoreapp2.0/neo-cli.dll .
NEO-CLI Version: 3.0.0.0
neo> show state
```
