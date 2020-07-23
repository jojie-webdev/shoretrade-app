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
};
