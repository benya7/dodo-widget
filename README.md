# Dodo Widget Trade

## Usage

In order to embed the widget add the following snippet at any location on the hosting page:

Demo Url: 
[https://en0c-026.github.io/dodo-widget/](https://en0c-026.github.io/dodo-widget/)

```html
<script>
    (function (w, d, s, o, f, js, fjs) {
        w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
        js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
        js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
    }(window, document, 'script', '_hw', './widget.js'));
    _hw('init', { targetId: 'widget-dodo' });
</script>
```


During initialization you can pass additional configurations to widget like so:

```diff
-_hw('init');
+_hw('init', { debug: true, targetId: 'widget-dodo' });
```

## Develop

The widget dev setup is similar to regular client application. To get started:

```bash
yarn
yarn start
```

This will open browser with "demo" page which hosts the widget.



# Config Options

## These are the types or interfaces for the properties of the "style" property in the configuration object

```typescript
interface Slides {
        horizontal?: string, 
        vertical?: string,
        top?: string, 
        bottom?: string, 
        left?: string, 
        right?: string
        }

type Size = 'xsmall' | 'small' | 'medium ' | 'large' | 'any value in px'

type SizeExtends = 'xxsmall' | 'xsmall' | 'small' | 'medium ' | 'large' | 'xlarge' | 'xxlarge' | 'any value in px'

type Position = 'start' | 'center' | 'baseline' | 'stretch'

type Color = 'brand' | 'accent-1' | 'accent-' | 'accent-3' | 'accent-4' | 'neutral-1' | 'neutral-2' | 'neutral-3' | 'neutral-4' | 'status-critical' | 'status-error' | 'status-warning' | 'status-ok' | 'status-unknown' | 'status-disabled' | 'light-1' | 'light-2' | 'light-3' | 'light-4' | 'light-5' | 'light-6' | 'dark-1' | 'dark-2' | 'dark-3' | 'dark-4' | 'dark-5' | 'dark- 6'
```


### This is the ID of the HTML element where the widget is to be rendered.

```typescript
type TargetElement: string

```

### This interface represents the 'style' property of the configuration object

```typescript
interface Style {
    pad: Size | Slides,
    margin: Size | Slides,
    round: Size,
    alignSelf: Position,
    width: SizeExtends,
    height: SizeExtends,
    background: Color
}
```

### This interface represents the Configuration object

```typescript
interface AppConfigurations {
    debug?: boolean;
    dodoBaseUrl?: string;
    targetId: TargetElement;
    style: Style
}
```


### License
The source and documentation in this project are released under the [MIT License](LICENSE)
