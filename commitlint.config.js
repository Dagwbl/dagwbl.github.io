// commitlint.config.js
module.exports = {
    // https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
    // https://commitlint.js.org/reference/prompt.html
    // ? Select the type of change that you're committing: (Use arrow keys)
    // ? feat:     A new feature
    //   fix:      A bug fix
    //   docs:     Documentation only changes
    //   style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    //   refactor: A code change that neither fixes a bug nor adds a feature
    //   perf:     A code change that improves performance
    //   test:     Adding missing tests or correcting existing tests
    extends: ["@commitlint/config-conventional"],
    rules: {
      // 自定义规则
      "type-enum": [2, "always", [
        "build", // 打包
        "chore", // 其他修改
        "ci", // 持续集成
        "docs", // 文档
        "feat", // 新功能
        "fix", // 修复bug
        "perf", // 性能优化
        "refactor", // 代码重构
        "revert",  // 回滚
        "style", // 代码格式修改，如空格、分号等
        "test", // 新增测试用例
        "article", // 新增文章
        "diary", // 新增日记
        "note", // 新增笔记
        "letter" // 新增信件
      ]]
    },
    helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
    prompt: {
      settings: {},
      messages: {
        skip: ':skip',
        max: 'upper %d chars',
        min: '%d chars at least',
        emptyWarning: 'can not be empty',
        upperLimitWarning: 'over limit',
        lowerLimitWarning: 'below limit'
      },
      questions: {
        type: {
          description: "Select the type of change that you're committing:",
          enum: {
            feat: {
              description: 'A new feature',
              title: 'Features',
              emoji: '✨',
            },
            fix: {
              description: 'A bug fix',
              title: 'Bug Fixes',
              emoji: '🐛',
            },
            docs: {
              description: 'Documentation only changes',
              title: 'Documentation',
              emoji: '📚',
            },
            style: {
              description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
              title: 'Styles',
              emoji: '💎',
            },
            refactor: {
              description: 'A code change that neither fixes a bug nor adds a feature',
              title: 'Code Refactoring',
              emoji: '📦',
            },
            perf: {
              description: 'A code change that improves performance',
              title: 'Performance Improvements',
              emoji: '🚀',
            },
            test: {
              description: 'Adding missing tests or correcting existing tests',
              title: 'Tests',
              emoji: '🚨',
            },
            build: {
              description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
              title: 'Builds',
              emoji: '🛠',
            },
            ci: {
              description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
              title: 'Continuous Integrations',
              emoji: '⚙️',
            },
            chore: {
              description: "Other changes that don't modify src or test files",
              title: 'Chores',
              emoji: '♻️',
            },
            revert: {
              description: 'Reverts a previous commit',
              title: 'Reverts',
              emoji: '🗑',
            },
          },
        },
        scope: {
          description:
            'What is the scope of this change (e.g. component or file name)',
        },
        subject: {
          description: 'Write a short, imperative tense description of the change',
        },
        body: {
          description: 'Provide a longer description of the change',
        },
        isBreaking: {
          description: 'Are there any breaking changes?',
        },
        breakingBody: {
          description:
            'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
        },
        breaking: {
          description: 'Describe the breaking changes',
        },
        isIssueAffected: {
          description: 'Does this change affect any open issues?',
        },
        issuesBody: {
          description:
            'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
        },
        issues: {
          description: 'Add issue references (e.g. "fix #123", "re #123".)',
        },
      },
      },
  };
