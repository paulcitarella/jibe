describe('Login', function() {

  it('should show the home screen', function (client, done) {
    client
      .url(client.launch_url)
      .waitForElementVisible('body', 1000)
      .assert.title('Jibe')
      .end();
  });

});
