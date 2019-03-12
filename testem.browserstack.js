module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  parallel: 5,
  browser_start_timeout: 2000,
  browser_disconnect_timeout: 120,
  launch_in_ci: ['BS_Safari_Current', 'BS_MS_Edge', 'BS_IE_11'],

  launch_in_dev: ['Chrome'],

  /* eslint-disable prettier/prettier */
  launchers: {
    BS_Safari_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      protocol: 'browser',
      args: [
        '--os', 'OS X',
        '--osv', 'Mojave',
        '--b', 'safari',
        '--bv', 'latest',
        '-t', '1200',
        '--u', '<url>'
      ]
    },
    BS_MS_Edge: {
      exe: 'node_modules/.bin/browserstack-launch',
      protocol: 'browser',
      args: [
        '--os', 'Windows',
        '--osv', '10',
        '--b', 'edge',
        '--bv', 'latest',
        '-t', '1200',
        '--u', '<url>'
      ]
    },
    BS_IE_11: {
      exe: 'node_modules/.bin/browserstack-launch',
      protocol: 'browser',
      args: [
        '--os', 'Windows',
        '--osv', '10',
        '--b', 'ie',
        '--bv', '11.0',
        '-t', '1500',
        '--u', '<url>&legacy=true'
      ]
    }
  }
  /* eslint-enable prettier/prettier */
};
