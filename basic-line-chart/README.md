# Basic line chart

This example is a basic line chart. In this example, we will explain:

- how to create the container
- how to add a line to the container
- how to add x-Axis and y-Axis
- how to add label for x-Axis and y-Axis

## Prepare the data

Run node data-generator.js or user the given data.csv.

## Create the html file

See the index.html. It contains an empty div to show the line chart we are going to build. And we set the id of this div to `chart` to use it easily.

We added the links to the css files:

```css
    <link rel="stylesheet" href="style.css" />
    <link
      href="https://fonts.googleapis.com/css?​family=Baloo Thambi 2"
      rel="stylesheet"
    />
```

One for our css and one for a font.

And script files:

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="./app.js"></script>
```

## Create the javascript file

See the app.js. We will add all javascript code that draw the line chart here.

## Load the data.csv

```javascript
const draw = async () => {
  const dataset = await d3.csv("data.csv");
  console.log(dataset);
};

draw();
```

If we open the index.html file, we could see the dataset is logged to the console.
