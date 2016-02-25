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

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('allFeed object has a name defined and that the name is not empty', function(){
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('allFeed[n].url are defined and not empty', function(){
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toMatch(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/);
            }
        });

    });


    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
         it('Menu element hidden by default', function(){
            // check if body tag has the class "menu-hidden"
            expect( $('body').hasClass( "menu-hidden" ) ).toBe(true);
         });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu changes visibility when the menu icon is clicked', function(){
            $('.menu-icon-link').click();
            expect( $('body').hasClass( "menu-hidden" ) ).toBe(false);
            $('.menu-icon-link').click();
            expect( $('body').hasClass( "menu-hidden" ) ).toBe(true);
          });
    });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

    describe('Initial Entries', function() {

        beforeEach(function(done){
            // run the asyn loadFeed function before testing
            loadFeed(0,function(){
                done();
            });
        });
        //makes sure after the loadFeed function runs we have something inside of the .feed container
        it('loadFeed() called, makes sure .feed container has at least a single .entry element', function(done){
            expect( $('.feed').children('.entry-link').length ).not.toBe(0);
            done();
        });


    });


        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
    describe('New Feed Selection', function() {

        var entryHeader;
        var header;

        beforeEach(function(done){
            //Run the asyn loadFeed function recursively, needs to be ran twice to check if content changes.
            loadFeed(0, function(){
                // We use the first entry header h2 title & and the header of the feed
                entryHeader = $('.entry-link .entry h2')[0];
                header = $('.header .header-title').html();
                loadFeed(1, function(){
                    done();
                });
            });

        });

        it('check if feeds changes', function(done){
            //checks if the entry header and feed header change.
            expect( $('.entry-link .entry h2')[0] ).not.toBe(entryHeader);
            expect( $('.header .header-title').html() ).not.toBe(header);
            done();
        });

    });


}());
