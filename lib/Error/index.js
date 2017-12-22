'use strict'

const chalk = require('chalk')

class PluginError extends Error {
  constructor (type, message, plugin) {
    super()

    const stack = this.stack.split('\n')
      .slice(1)
      .join('\n')

    this.message = type === 'warning'
      ? `\n${
        chalk.yellow(plugin)
      }\n\n${
        chalk.inverse.yellow(`> ${message}`)
      }\n\n${
        chalk.yellow(stack)
      }\n`
      : `\n${
        chalk.red(plugin)
      }\n\n${
        chalk.inverse.red(`> ${message}`)
      }\n\n${
        chalk.red(stack)
      }\n`

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = PluginError
