# Memorize bot

Memorize messenger bot using [intelligo framework](https://github.com/intelligo-systems/intelligo).

## How to run

clone this repo.

```bash
$ git clone https://github.com/intelligo-systems/memorize-bot.git && cd memorize-bot
```

Set the values in `config/default.json` before running the bot. Using your Facebook Page's / App's `ACCESS_TOKEN`, `VERIFY_TOKEN` and `APP_SECRET`

- `ACCESS_TOKEN:` A page access token for your app, found under App -> Products -> Messenger -> Settings -> Token Generation
- `VERIFY_TOKEN:` A token that verifies your webhook is being called. Can be any value, but needs to match the value in App -> Products -> Webhooks -> Edit Subscription
- `APP_SECRET:` A app secret for your app, found under App -> Settings -> Basic -> App Secret -> Show

**Note:** If you don't know how to get these tokens, take a look at Facebook's [Quick Start Guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) .

Install dependencies:

```bash
$ npm install
```

Start your bot server:

```bash
$ npm start
```

## Contributors

- 📥 Pull requests and 🌟 Stars are always welcome. 
- You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples
or translating any document here to your language.

## Supporting

If you'd like to join them, please consider:

 <a href='https://www.ko-fi.com/turtuvshin' target="_blank">
    <img src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' height='35' alt='Buy Me a Coffee at ko-fi.com' />
 </a> 
 <a href='https://www.patreon.com/turtuvshin' target="_blank">
    <img src='https://c5.patreon.com/external/logo/become_a_patron_button@2x.png' height='35' alt='Become a Patron!' />
  </a>
 <a href="https://opencollective.com/intelligo/donate" target="_blank">
  <img src="https://opencollective.com/intelligo/donate/button@2x.png?color=blue" height='35'/>
</a>

## License

> Copyright (C) 2019 Intelligo Systems.  
> Intelligo framework is open-sourced software licensed under the [MIT](https://opensource.org/licenses/MIT) license.  
> (See the [LICENSE](https://github.com/intelligo-systems/intelligo/blob/master/LICENSE) file for the whole license text.)
