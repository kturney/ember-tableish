# ember-tableish

[npm-badge]: https://img.shields.io/npm/v/ember-tableish.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-tableish
[ember-observer-badge]: http://emberobserver.com/badges/ember-tableish.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-tableish
[browserstack-badge]: https://www.browserstack.com/automate/badge.svg?badge_key=VWJFUWl3OEpWRldvaXFhYU9YRWlZOWVQNmlvNGdQRnJ1bGJUVThidHowND0tLUZ6VEMxVWNnYXIwbVRQSjFhbmltNVE9PQ==--c31eecf4240110bbf5b0086e7aa698b1f23c7778
[browserstack-badge-url]: https://www.browserstack.com/automate/badge.svg?badge_key=VWJFUWl3OEpWRldvaXFhYU9YRWlZOWVQNmlvNGdQRnJ1bGJUVThidHowND0tLUZ6VEMxVWNnYXIwbVRQSjFhbmltNVE9PQ==--c31eecf4240110bbf5b0086e7aa698b1f23c7778
[github-actions-badge]: https://github.com/kturney/ember-tableish/actions/workflows/main.yml/badge.svg?branch=master&event=push
[github-actions-url]: https://github.com/kturney/ember-tableish/actions/workflows/main.yml

[![Github Actions Status][github-actions-badge]][github-actions-url]
[![Latest NPM release][npm-badge]][npm-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]

A table implementation based on [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) instead of semantic HTML table elements.
Being grid based allows more flexibility, e.g. the ability to have rows be links.

## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above

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


