# GuildCraftsGoalReviewerProject

## Description

A repo that pulls in our goals/issues and displays them while maximizing a great UX.
Basically, you need to duplicate the functionality of a Rails app: [GitHub repo] (https://github.com/bluemihai/goals-viewer), [live on Heroku](https://goals-viewer-api.herokuapp.com/).

## Context

Serving an actual customer is a huge part of writing good software.  If you take on this goal, you will be the customer, and have access to 19 other users - so you can talk to them, and learn about good User Experience Design (UX).

## Required Specs (Must Have)

- [x] Oauth for users to login with.
- [x] Pull data directly from GitHub, instead of storing data locally.
- [ ] An external, published, all-JS site which improves the UX of browsing/searching these goals
- [ ] Basically, duplicate the functionality of https://goals-viewer-api.herokuapp.com
- [ ] Store voting data in GitHub
- [x] Your site uses the GitHub API to access goal data.
- [ ] You have interviewed at least three potential users at your app and integrated their feedback
- [x] You have deployed a first verison midweek and at this point focused on UX.
- [x] Use React to create a smooth, one-page app UX
- [ ] You can search/filter the full description in table view
- [x] Registered (or anonymous) users can review goals
- [x] The artifact produced is properly licensed, preferably with the [MIT license][mit-license].
- [ ] Integrate with echo to pull in info of who's already completed one goals (instead of having to enter it manually as currently done)

![project flow](https://cloud.githubusercontent.com/assets/18561576/16932874/4eef764a-4cfe-11e6-83fb-d17dcc66d915.JPG)

![wireframes](https://cloud.githubusercontent.com/assets/18561576/16932893/75b7d826-4cfe-11e6-8f1c-616d126a7b36.JPG)

![functions](https://cloud.githubusercontent.com/assets/18561576/16932901/86092c52-4cfe-11e6-9710-32a8fc334960.JPG)

---

<!-- LICENSE -->

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a>
<br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

[mit-license]: https://opensource.org/licenses/MIT

## Development

Start the server

```bash
 ./node_modules/.bin/nodemon index.js
 ```
