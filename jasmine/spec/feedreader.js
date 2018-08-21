/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* This test loops through each feed in the
     * allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    it('URLs are defined and not empty', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* This test loops through each feed in the
     * allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

    it('names are defined and not empty', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });


  /* This is a new test suite named "The menu" where
   * where the menu functionality will be tested.
   */

  describe('The menu', function() {

    /* This test ensures the menu element is hidden
     * by default. This checks if the menu-hidden class
     * is being used here.
     */

    it('menu element is hidden by default', function() {
      const body = document.querySelector('body');
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });

    /* This test ensures the menu changes visibility
     * when the menu icon is clicked. This test clicks
     * the menu twice to test the change.
     */

    it('menu changes when clicked', function() {
      const body = document.querySelector('body');
      const menu = document.querySelector('.menu-icon-link');

      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(false);

      menu.click();
      expect(body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  /* This is a new test suite named "Initial Entries" */

  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    /* This test ensures that when the loadFeed function is
     * called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    it('at least one entry in feed container', function() {
      const feed = document.querySelector('.feed');

      expect(feed.length).not.toBe(0);
    });
  });

  /* This is a new test suite named "New Feed Selection" */

  /* This a test that ensures when a new feed is loaded
   * by the loadFeed function that the content actually changes
   * and loadFeed() is asynchronous here.
   */

  describe('New Feed Selection', function() {
    var feedOne,
        feedTwo;

    beforeEach(function(done) {
      loadFeed(0, function() {
        feedOne = document.querySelector('.entry').innerText;

      loadFeed(1, function() {
        feedTwo = document.querySelector('.entry').innerText;
          done();
        });
      });
    });

    /* After each feed is loaded, the feeds are compared with each
     * other to ensure they contain different content.
     */
     
    it('content changed', function() {
      expect(feedOne === feedTwo).toBe(false);
    });
  });
}());
