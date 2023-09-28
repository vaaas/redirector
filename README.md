# redirector

Simple node.js based url shortener / redirect service. HTTP only.

You can find a demo app in [go.sexualise.it](https://go.sexualise.it). For example, try this redirect to Google: [go.sexualise.it/google](https://go.sexualise.it/google).

## Requirements

- nodejs
- npm (build only)
- dpkg-deb (packaging only)
- systemd (service only)

## Running

After building the application, run:

```bash
node ./redirector
```

By default it listens to the first public IPv4 address (`0.0.0.0`) and port `8000`. The URLs file is a tab-separated plain text file located in the same working directory and named `urls.txt`.

If you wish to change the defaults, refer to the configuration section.

## Configuration

Configuration is done by passing command-line flags.

Available options:

| flag | option | description | example |
| --- | --- | --- | --- |
| `--host` | IPv4 or domain name | address to listen to | `--host 127.0.0.1` |
| `--port` | IP port | port to listen to | `--port 80` |
| `--urls` | pathname | where to find the urls file | `--urls /etc/redirector/urls.txt` |
| `--fd` | pathname | pathname of a unix domain socket that will be opened to listen for requests instead of a host and a port | `--fd /tmp/redirector.socket` |

## URLs file

The URLs file is a tab-separated plain file of entries to map. For example:

```tsv
google	https://google.com
bing	https://bing.com
```

Will redirect `/google` to `https://google.com` and `/bing` to `https://bing.com`.

## Building

In the project's root directory:

- install npm dependencies: `npm i`
- bundle the application: `npm run build`

You should have a file called `redirector` in the root directory. You can run it as follows:


## Packaging

If you have `dpkg-deb` and you are in a debian-based system:

- install npm dependencies if you haven't already: `npm i`
- create the deb file: `npm run make:deb`

## Development

- install npm dependencies: `npm i`
- create a `./urls.txt` file with redirects that you wish to test
- run the app: `npm run start`

## Testing

You can run all the unit tests through npm: `npm run test`
