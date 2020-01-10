---
title: How to Make a Custom Field Component
date: '2020-01-20T07:00:00.000Z'
author: Kendall Strautman
draft: false
consumes:
  - file: null
    details: null
---

Form fields are the bread and butter of any CMS. While Tina provides a solid collection of fields 'out-of-the-box', you can also create your own. This post will show you the basic concepts of how to create custom field components and register them to the Tina sidebar.

**Prerequisites 👩‍🏫**

This post will refer to some core TinaCMS concepts such as [forms](https://tinacms.org/docs/concepts/forms), the [sidebar](https://tinacms.org/docs/concepts/sidebar), and [fields](https://tinacms.org/docs/concepts/fields). It will be helpful to have some basic working knowledge of [**how TinaCMS works**](https://tinacms.org/docs/getting-started/how-tina-works) before reading. Feel free to refer to the [documentation](https://tinacms.org/docs/getting-started/introduction) or read a post on using Tina with [Gatsby](https://www.gatsbyjs.org/blog/2019-12-20-integrate-tinacms-with-your-gatsby-website/) or [Next.js](https://tinacms.org/blog/using-tinacms-with-nextjs/) to get familiar.

## Why would you create a custom field?

Tina was intended to be fully customizable and extensible. Creating **custom fields can provide finite control** over the sidebar configuration and styling, along with implementing unique field functionality.

![GIF HERE?]()

## Two Methods, Let’s start simple

There are two ways to add [custom fields](https://tinacms.org/docs/fields/custom-fields) to Tina. The first approach involves _defining a React component and passing it into the `component` property_ of a field definition. The Tina Team refers to this as an **inline field component.** This option more straightforward; it will be the method of focus in this post.

The second approach involves defining a custom component, then registering that component as a [field plugin](https://tinacms.org/docs/fields/custom-fields#2-creating-field-plugins) with the CMS. All the [core fields](https://tinacms.org/docs/concepts/fields) provided by Tina are set up as plugins.

There are some advantages to creating a plugin versus an inline field — the main points being reusability and access to additional functions for parsing, validation etc. But **for simpler cases** when you need a custom field in say just one form or don’t necessarily need validation, a custom inline field will do just fine 👌.

## Creating a custom inline field

Say we have a [Tina Form](https://tinacms.org/docs/concepts/forms) set up for an _About Me_ page:

``` js
 const formOptions = {
   label: 'About Me Page',
   fields: [
     {
       label: "Name",
       name: "rawJson.name",
       component: text,
     },
     {
       label: "Hometown",
       name: "rawJson.hometown",
       component: text,
     },
     {
       label:"Color",
       name:"rawJson.background_color",
       description: "Background Color",
       component: "color"
     },
   ]
 }

```
We could add a custom inline field component to further organize the sidebar:

``` js
const formOptions = {
   label: 'Info Page',
   fields: [
     {
       label: "Name",
       name: "rawJson.name",
       component: "text",
     },
     {
       label: "Hometown",
       name: "rawJson.hometown",
       component: "text",
     },
     // This is our custom inline field 👀
     {
       name: "_",
       component: () => <h4>Page Styles</h4>,
     },
     {
       label:"Color",
       name:"rawJson.background_color",
       description: "Background Color",
       component: "color"
     },
   ]
 }
```



_Pretty cool huh?_ 🤩

Notice how in all of the other field objects, the `component` property is referencing a Tina field plugin, whereas **with our custom inline field, we are only passing in a React component.**

![IMG HERE]()

Now this example component is super simple — a glorified label. This type of component can be helpful with organizing or customizing the sidebar, but _we can go further and pass in more complex fields_.

## Custom Range Slider 🎨

Say we had an image on the _About Me_ page and we wanted to be able to control some [CSS filters](https://css-tricks.com/almanac/properties/f/filter/) on that image. The pen below shows all the CSS filters we have to play with.

<br>

<iframe height="450" style="width: 100%;" scrolling="no" title="CSS Filters + A Springer Spaniel" src="https://codepen.io/kendallstrautman/embed/WNbzLJZ?height=265&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/kendallstrautman/pen/WNbzLJZ'>CSS Filters + A Springer Spaniel</a> by Kendall strautman
  (<a href='https://codepen.io/kendallstrautman'>@kendallstrautman</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

We can create a custom input field to provide editing control over these visual filters. **Let’s make a custom field that controls image saturation.**

<tip>**Tip:** Saturation in photography relates to the _intensity of particular colors in an image_. A highly saturated image would be very bright, with colors bordering on neon. An image with low saturation would appear more grey, with muted colors.</tip>

### 1. Create the input field component

To create a custom input field, we need to make a **React component that takes input and updates data when the input is altered**. For this example, we are going to make an [range input field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range) that handles the state of the saturation value and updates that state whenever the range control is slid.

``` js
// An example of a custom range field component
function rangeInput(props) {
   return (
     <>
       <div>
         <label for="saturation">Image Saturation</label>
       </div>
       <div>
         <input
            name="saturation"
            id="saturation"
            type="range"
            min="0"
            max="10"
            step=".1"
            /*
            ** This special input
            ** object sets essential
            ** input props: value,
            ** onChange, onFocus etc.
            */
            {...props.input}
          />
        </div>
     </>
   )
 }

```

#### 👽 Take a closer look — Props:

Notice this line, `{...props.input}`. You may be wondering where this magical object with all of the necessary input props is coming from?

When the custom field is registered with Tina, this **input object** is passed in as a prop to the field. This object contains all the necessary data and callbacks for the input to function properly: [`value`](https://final-form.org/docs/react-final-form/types/FieldRenderProps#inputvalue), [`name`](https://final-form.org/docs/react-final-form/types/FieldRenderProps#inputname), [`onChange`](https://final-form.org/docs/react-final-form/types/FieldRenderProps#inputonchange), [`onFocus`](https://final-form.org/docs/react-final-form/types/FieldRenderProps#inputonfocus), [`onBlur`](https://final-form.org/docs/react-final-form/types/FieldRenderProps#inputonblur).

<tip> If your custom component is not a standard [HTML input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), you will need to manually pass in the necessary input props, as opposed to using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).</tip>

**All of the props** passed to the field component are:

- `field` — A reference to the [field definition](https://tinacms.org/docs/concepts/fields#field-definition).
- `input` — The object with data and callbacks for the field to set and update data. _Outlined above_ ☝️.
- `meta` — This provides [metadata](https://final-form.org/docs/react-final-form/types/FieldRenderProps#metaactive) about the state of the field.
- `tinaForm` — A reference to the form where this field is registerd.

The [react-final-form documentation](https://final-form.org/docs/react-final-form/api/Field#3-connect-the-callbacks-to-your-input) describes the `input` and `meta` props incredibly well. When creating custom fields, you'll typically be accessing the `field` and `input` props.


### 2. Add the value to the source data

Now that the custom input field is set up, we need to add the `image_saturation` value to our source data. The source data could be a Markdown or JSON file. If you already have a Tina Form set up, it should be linked with a data source, so head to that file.

For our example, let's say we have a local JSON file called `About.json`. This file contains the data used in the _About Me_ page. In it we can add the `image_saturation` value.

The value can be any integer or floating point number that exists between the range defined in our `rangeInput` component above — 0 to 10, with a step of 0.1 (meaning each 'slide step' of the range increments or decrements the value by 0.1). As a saturation value, **zero would be totally grayscale** or no color, so we can fill in something like 3 to get a more 'normal' look.

``` JSON
{
 “name”: “Koba Weasley”,
 “hometown”: “Bend, Oregon”,
 "background_color": "#B1BCBC",
 "image_saturation": 3,
}
```
<tip> If you’re using Gatsby, you will **need to update your GraphQL query** to get this new data. Add the `image_saturation` field to your query.</tip>

So now we have a source value that can be connected to the custom input field. This way, **Tina can update the value in the source file** in sync with the changes picked up by the `rangeInput` component.

### 3. Add the custom field to a Tina Form

How about we wire up this custom field to Tina? 🎊

In this step, we need to create the custom field definition and pass in the `rangeInput` component inline. We'll go back to our _About Me_ page [form options](https://tinacms.org/docs/gatsby/json#customizing-json-forms):

``` js
const formOptions = {
   label: 'About Me Page',
   fields: [
     {
       label: "Name",
       name: "rawJson.name",
       component: "text",
     },
     {
       label: "Hometown",
       name: "rawJson.hometown",
       component: "text",
     },
     {
       name: "",
       component: () => <h4>Page Styles</h4>,
     },
     // Pass the custom inline field into `component`
     {
       label: "Image Saturation",
       name: "rawJson.image_saturation",
       component: rangeInput,
     },
     {
       label:"Color",
       name:"rawJson.background_color",
       description: "Background Color",
       component: "color"
     },
   ]
 }
```

Now if you start the development server, you should see the custom `rangeInput` field in the sidebar. And if you slide it, you should see the value updating in `About.json`.

### 4. Dynamically set the CSS filter

 As you can see, the custom field component is wired up, but we haven’t connected the _saturation value_ with a CSS filter to actually see an effect on the image.

In order to do this, you’ll need to be using a [CSS-in-JS](https://css-tricks.com/bridging-the-gap-between-css-and-javascript-css-in-js/) framework so we can dynamically update the filter values through the component props. If you’re using Next.js, `styled-jsx` is great and it works out of the box with Next.js. Below is an example of the _saturation value_ being connected to the CSS filter with `styled-jsx`:

``` js
/*
**  This is an example component
**  for the About Me page in Next.js
*/
import { useLocalJsonForm } from "next-tinacms-json";

function AboutMe(props) {
  const [data] = useLocalJsonForm(props.data, formOptions)
  return (
    <Layout bgColor={data.rawJson.background_color}>
      <section className="info_blurb">
        <h1>Hi 👩‍🎤 my name is {data.rawJson.name}</h1>
        <p>Currently gallivanting around {data.rawJson.hometown}</p>

        {/* Here is the image that will get the treatment 🖼 */}
        <img alt="random-unsplash" src="https://source.unsplash.com/random/800x600" />

      </section>
      <style jsx>{`

        {/* Pass in the image_saturation value 🖍 */}
        img {
          filter: saturate(${data.rawJson.image_saturation})
        }

        .info_blurb {
          max-width: 800px;
          padding: 1.5rem 1.25rem;
        }
        @media (min-width: 768px) {
          .info_blurb {
            padding: 2rem;
          }
        }
        @media (min-width: 1440px) {
          .info_blurb {
            padding: 3rem;
          }
        }
      `}</style>
    </Layout>
  )
}

```

Some other examples of _CSS-in-JS_ frameworks you could use would be [styled-components](https://www.styled-components.com/)  💅 or [emotion.js](https://emotion.sh/docs/introduction) 👩‍🎤. Note that the above implementation for these alternative frameworks this will be slightly different.

### Next Steps

A good next step would be _adding styles to the custom `rangeInput` component_. You could use [`@tinacms/styles`](https://github.com/tinacms/tinacms/blob/master/packages/%40tinacms/styles/src/Styles.tsx) to fit the vibe of other Tina fields ✌️. Or you could go wild and spice up the sidebar in your own way 🤠.

If we wanted to reuse this component throughout the site, **we could take a step further and make it into a [Field Plugin](https://tinacms.org/docs/fields/custom-fields#2-creating-field-plugins)**. Stay tuned for a follow-up post that dives into creating custom Field Plugins, or swing by the [docs](https://tinacms.org/docs/fields/custom-fields#2-creating-field-plugins) to get a head start.

### Takeaways 🕺🏻

Making custom field components for TinaCMS is incredibly exciting! Hopefully this post got your creative gears turning on the numerous variables to tinker with in the content editing experience.

I think the biggest takeaway from this short exploration of custom fields is that **you can put any React component into the sidebar**. This flexibility is very powerful; it opens the door for you to custom-tune the editing controls for a project depending on its unique needs. And while creating custom components may not be necessary all the time, simply knowing it’s an option is reassuring, if not inspiring.
