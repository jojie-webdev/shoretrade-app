module.exports = (plop) => {
  plop.setGenerator('base', {
    description: 'Create a base component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your base component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/base/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/base/index.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/base/{{pascalCase name}}/{{pascalCase name}}.props.ts',
        templateFile: 'plop-templates/base/base.props.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/base/{{pascalCase name}}/{{pascalCase name}}.style.ts',
        templateFile: 'plop-templates/base/base.style.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/base/{{pascalCase name}}/{{pascalCase name}}.view.tsx',
        templateFile: 'plop-templates/base/base.view.tsx.hbs',
      },
      {
        type: 'add',
        path: '.storybook/stories/base/{{pascalCase name}}.js',
        templateFile: 'plop-templates/base/base.story.js.hbs',
      },
    ],
  });
  plop.setGenerator('module', {
    description: 'Create a module component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your module component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/module/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/module/index.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/module/{{pascalCase name}}/{{pascalCase name}}.props.ts',
        templateFile: 'plop-templates/module/module.props.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/module/{{pascalCase name}}/{{pascalCase name}}.style.ts',
        templateFile: 'plop-templates/module/module.style.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/module/{{pascalCase name}}/{{pascalCase name}}.view.tsx',
        templateFile: 'plop-templates/module/module.view.tsx.hbs',
      },
      {
        type: 'add',
        path: '.storybook/stories/module/{{pascalCase name}}.js',
        templateFile: 'plop-templates/module/module.story.js.hbs',
      },
    ],
  });
  plop.setGenerator('smart module', {
    description: 'Create a smart module component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your smart module component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/module/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/smart-module/index.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/module/{{pascalCase name}}/{{pascalCase name}}.props.ts',
        templateFile: 'plop-templates/smart-module/module.props.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/module/{{pascalCase name}}/{{pascalCase name}}.style.ts',
        templateFile: 'plop-templates/smart-module/module.style.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/module/{{pascalCase name}}/{{pascalCase name}}.view.tsx',
        templateFile: 'plop-templates/smart-module/module.view.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/module/{{pascalCase name}}/{{pascalCase name}}.container.tsx',
        templateFile: 'plop-templates/smart-module/module.container.tsx.hbs',
      },
      {
        type: 'add',
        path: '.storybook/stories/module/{{pascalCase name}}.js',
        templateFile: 'plop-templates/smart-module/module.story.js.hbs',
      },
    ],
  });
  plop.setGenerator('redux socket', {
    description: 'Create a websocket redux state',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your new redux state name?',
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/store/reducers/socket{{pascalCase name}}.ts',
        templateFile: 'plop-templates/redux-socket/redux-socket.reducer.js.hbs'
      },
      {
        type: 'add',
        path: 'src/store/actions/socket{{pascalCase name}}.ts',
        templateFile: 'plop-templates/redux-socket/redux-socket.action.js.hbs'
      },
      {
        type: 'add',
        path: 'src/types/store/socket{{pascalCase name}}State.ts',
        templateFile: 'plop-templates/redux-socket/redux-socket.state.js.hbs'
      }
    ]
  });
  plop.setGenerator('layout', {
    description: 'Create a layout component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your layout component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/layout/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/layout/index.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/layout/{{pascalCase name}}/{{pascalCase name}}.props.ts',
        templateFile: 'plop-templates/layout/layout.props.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/layout/{{pascalCase name}}/{{pascalCase name}}.style.ts',
        templateFile: 'plop-templates/layout/layout.style.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/layout/{{pascalCase name}}/{{pascalCase name}}.view.tsx',
        templateFile: 'plop-templates/layout/layout.view.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/components/layout/{{pascalCase name}}/{{pascalCase name}}.container.tsx',
        templateFile: 'plop-templates/layout/layout.container.tsx.hbs',
      },
      {
        type: 'add',
        path: '.storybook/stories/layout/{{pascalCase name}}.js',
        templateFile: 'plop-templates/layout/layout.story.js.hbs',
      },
    ],
  });
  plop.setGenerator('route', {
    description: 'Create a route component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your route name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/routes/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/route/index.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/{{pascalCase name}}/{{pascalCase name}}.props.ts',
        templateFile: 'plop-templates/route/route.props.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/{{pascalCase name}}/{{pascalCase name}}.style.ts',
        templateFile: 'plop-templates/route/route.style.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/{{pascalCase name}}/{{pascalCase name}}.view.tsx',
        templateFile: 'plop-templates/route/route.view.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/{{pascalCase name}}/{{pascalCase name}}.container.tsx',
        templateFile: 'plop-templates/route/route.container.tsx.hbs',
      },
    ],
  });
  plop.setGenerator('seller-route', {
    description: 'Create a seller route component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your seller route name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/routes/Seller/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/seller-route/index.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/Seller/{{pascalCase name}}/{{pascalCase name}}.props.ts',
        templateFile: 'plop-templates/seller-route/route.props.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/Seller/{{pascalCase name}}/{{pascalCase name}}.style.ts',
        templateFile: 'plop-templates/seller-route/route.style.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/Seller/{{pascalCase name}}/{{pascalCase name}}.view.tsx',
        templateFile: 'plop-templates/seller-route/route.view.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/Seller/{{pascalCase name}}/{{pascalCase name}}.container.tsx',
        templateFile: 'plop-templates/seller-route/route.container.tsx.hbs',
      },
    ],
  });
  plop.setGenerator('buyer-route', {
    description: 'Create a buyer route component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your buyer route name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/routes/Buyer/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/buyer-route/index.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/Buyer/{{pascalCase name}}/{{pascalCase name}}.props.ts',
        templateFile: 'plop-templates/buyer-route/route.props.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/Buyer/{{pascalCase name}}/{{pascalCase name}}.style.ts',
        templateFile: 'plop-templates/buyer-route/route.style.ts.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/Buyer/{{pascalCase name}}/{{pascalCase name}}.view.tsx',
        templateFile: 'plop-templates/buyer-route/route.view.tsx.hbs',
      },
      {
        type: 'add',
        path:
          'src/routes/Buyer/{{pascalCase name}}/{{pascalCase name}}.container.tsx',
        templateFile: 'plop-templates/buyer-route/route.container.tsx.hbs',
      },
    ],
  });
  plop.setGenerator('svg', {
    description: 'Create svg component and storybook entry',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your svg name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/base/SVG/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/svg/component.tsx.hbs',
      },
      {
        type: 'append',
        path: 'src/components/base/SVG/index.tsx',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: "export { default as {{pascalCase name}} } from './{{pascalCase name}}';",
      },
      {
        type: 'append',
        path: '.storybook/stories/base/SVG.js',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: "  {{pascalCase name}},",
      },
      {
        type: 'append',
        path: '.storybook/stories/base/SVG.js',
        pattern: '{/* PLOP_INJECT_INSTANCE*/}',
        template: `        <Wrapper label="{{pascalCase name}}">
          <{{pascalCase name}} width={30} height={30} />
        </Wrapper>`,
      },
    ],
  });
  plop.setGenerator('store', {
    description:
      'Create a basic action and reducer for global state management',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your state name? (ex. Cart)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/types/store/{{pascalCase name}}State.ts',
        templateFile: 'plop-templates/store/state.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/types/store/Store.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template:
          "import { {{pascalCase name}}State } from './{{pascalCase name}}State';",
      },
      {
        type: 'append',
        path: 'src/types/store/Store.ts',
        pattern: '/* PLOP_INJECT_INSTANCE */',
        template: '  {{camelCase name}}: {{pascalCase name}}State;',
      },
      {
        type: 'add',
        path: 'src/store/actions/{{camelCase name}}.ts',
        templateFile: 'plop-templates/store/actions.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/store/actions/index.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template:
          "export { default as {{camelCase name}}Actions } from './{{camelCase name}}';",
      },
      {
        type: 'add',
        path: 'src/store/reducers/{{camelCase name}}.ts',
        templateFile: 'plop-templates/store/reducers.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/store/reducers/index.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: "import {{camelCase name}} from './{{camelCase name}}';",
      },
      {
        type: 'append',
        path: 'src/store/reducers/index.ts',
        pattern: '/* PLOP_INJECT_INSTANCE */',
        template: '  {{camelCase name}},',
      },
    ],
  });
  plop.setGenerator('store:async', {
    description: 'Create asynchronous global state',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your state name? (ex. Get All Listings)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/types/store/{{pascalCase name}}State.ts',
        templateFile: 'plop-templates/store/async/state.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/types/store/Store.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: `import {
  {{pascalCase name}}Meta,
  {{pascalCase name}}Payload,
} from './{{pascalCase name}}State';`,
      },
      {
        type: 'append',
        path: 'src/types/store/Store.ts',
        pattern: '/* PLOP_INJECT_INSTANCE */',
        template:
          '  {{camelCase name}}: AsyncState<{{pascalCase name}}Meta, {{pascalCase name}}Payload>;',
      },
      {
        type: 'add',
        path: 'src/store/actions/{{camelCase name}}.ts',
        templateFile: 'plop-templates/store/async/actions.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/store/actions/index.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template:
          "export { default as {{camelCase name}}Actions } from './{{camelCase name}}';",
      },
      {
        type: 'add',
        path: 'src/store/reducers/{{camelCase name}}.ts',
        templateFile: 'plop-templates/store/async/reducers.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/store/reducers/index.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: "import {{camelCase name}} from './{{camelCase name}}';",
      },
      {
        type: 'append',
        path: 'src/store/reducers/index.ts',
        pattern: '/* PLOP_INJECT_INSTANCE */',
        template: '  {{camelCase name}},',
      },
      {
        type: 'add',
        path: 'src/store/sagas/{{camelCase name}}.ts',
        templateFile: 'plop-templates/store/async/sagas.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/store/sagas/index.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: "import {{camelCase name}} from './{{camelCase name}}';",
      },
      {
        type: 'append',
        path: 'src/store/sagas/index.ts',
        pattern: '/* PLOP_INJECT_INSTANCE */',
        template: '  {{camelCase name}},',
      },
    ],
  });
};
