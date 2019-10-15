# ember-tableish

[npm-badge]: https://img.shields.io/npm/v/ember-tableish.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-tableish
[travis-badge]: https://img.shields.io/travis/kturney/ember-tableish/master.svg
[travis-badge-url]: https://travis-ci.org/kturney/ember-tableish
[ember-observer-badge]: http://emberobserver.com/badges/ember-tableish.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-tableish
[browserstack-badge]: https://www.browserstack.com/automate/badge.svg?badge_key=VWJFUWl3OEpWRldvaXFhYU9YRWlZOWVQNmlvNGdQRnJ1bGJUVThidHowND0tLUZ6VEMxVWNnYXIwbVRQSjFhbmltNVE9PQ==--c31eecf4240110bbf5b0086e7aa698b1f23c7778
[browserstack-badge-url]: https://www.browserstack.com/automate/badge.svg?badge_key=VWJFUWl3OEpWRldvaXFhYU9YRWlZOWVQNmlvNGdQRnJ1bGJUVThidHowND0tLUZ6VEMxVWNnYXIwbVRQSjFhbmltNVE9PQ==--c31eecf4240110bbf5b0086e7aa698b1f23c7778

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]
[![BrowserStack Status][browserstack-badge]][browserstack-badge-url]

A table implementation based on [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) instead of semantic HTML table elements.
Being grid based allows more flexibility, e.g. the ability to have rows be links.

## Compatibility

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above

## Installation

```
ember install ember-tableish
```


## Usage

To render simple content:
```hbs
<EmberTableish as |table|>
  <table.Headers as |headers|>
    <headers.Header @width='10rem'>
      First Name
    </headers.Header>
    <headers.Header @width='10%'>
      Middle Name
    </headers.Header>
    <headers.Header>
      Last Name
    </headers.Header>
  </table.Headers>

  <table.Body>
    {{#each this.people as |person|}}
      <table.Row>
        <div>{{person.firstName}}</div>
        <div>{{person.middleName}}</div>
        <div>{{person.lastName}}</div>
      </table.Row>
    {{/each}}
  </table.Body>
</EmberTableish>
```

To render longer content with [vertical-collection](https://github.com/html-next/vertical-collection):
```hbs
<EmberTableish as |table|>
  <table.Headers as |headers|>
    <headers.Header @width='10rem'>
      First Name
    </headers.Header>
    <headers.Header @width='10%'>
      Middle Name
    </headers.Header>
    <headers.Header>
      Last Name
    </headers.Header>
  </table.Headers>

  <VerticalCollection
    class={{table.bodyCls}}
    @tagName='div'
    @estimateHeight='1.5rem'
    @items={{this.people}}
  as |person|>
    <LinkTo class={{table.rowCls}} @route='person' @model={{person.id}}>
      <div>{{person.firstName}}</div>
      <div>{{person.middleName}}</div>
      <div>{{person.lastName}}</div>
    </LinkTo>
  </VerticalCollection>
</EmberTableish>
```

Default column width is [`1fr`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout#The_fr_Unit).

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).

---

Cross-browser testing provided by:

<a href="https://www.browserstack.com">
  <img height="70" src="docs/browserstack-logo.svg" alt="BrowserStack">
</a>
