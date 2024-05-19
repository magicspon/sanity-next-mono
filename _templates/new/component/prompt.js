// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDirectories } = require('../../utils')

module.exports = {
  prompt: async ({ prompter }) => {
    const { name } = await prompter.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter the component name:',
    })

    const { directory } = await prompter.prompt({
      type: 'select',
      name: 'directory',
      message: 'Directory:',
      choices: ['apps', 'packages'],
    })

    const { package } = await prompter.prompt({
      type: 'select',
      name: 'package',
      message: 'Package',
      choices: getDirectories(directory),
    })

    let dir = ''
    let storybook
    let variants
    const isUi = package === 'ui'
    if (isUi) {
      const result = await prompter.prompt({
        type: 'select',
        name: 'uiDir',
        message: 'Package',
        choices: ['componenets', 'primitives'],
      })
      dir = `/src/${result.uiDir}`
      result = await prompter.prompt({
        type: 'confirm',
        name: 'storybook',
        message: 'Do you want to include a story:',
      })

      storybook = result.storybook

      result = await prompter.prompt({
        type: 'confirm',
        name: 'variants',
        message: 'Do you want to use a variants:',
      })

      variants = result.variants
    }

    const { forwardRef } = await prompter.prompt({
      type: 'confirm',
      name: 'forwardRef',
      message: 'Forward ref?',
    })

    const { tests } = await prompter.prompt({
      type: 'confirm',
      name: 'tests',
      message: 'Do you want to include tests:',
    })

    const basePath = `${directory}/${package}`
    const path = isUi ? `${basePath}${dir}` : `${basePath}/app/components`

    return {
      path,
      tests,
      storybook,
      name,
      forwardRef,
      variants,
    }
  },
}
