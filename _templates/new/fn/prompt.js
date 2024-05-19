// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDirectories } = require('../../utils')

module.exports = {
  prompt: async ({ prompter }) => {
    const { name } = await prompter.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter the function name:',
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

    const { tests } = await prompter.prompt({
      type: 'confirm',
      name: 'tests',
      message: 'Do you want to include tests:',
    })

    const basePath = `${directory}/${package}`
    console.log({ directory, basePath })
    const path =
      directory === 'apps' ? `${basePath}/app/utils` : `${basePath}/src/utils`

    return {
      path,
      tests,
      name,
    }
  },
}
