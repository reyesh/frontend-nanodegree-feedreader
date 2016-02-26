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
        /* it('has a name defined and that the name is not empty', function(){
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
            }
        }); */

        //Place the it function inside another declared function to display which array element we're testing.
        function testEachObjInallFeeds(index){
            it('has a name defined and that the name is not empty for allFeeds['+index+'].name', function(){
                expect(allFeeds[index].name).toBeDefined();
                expect(allFeeds[index].name.length).not.toBe(0);
            });
        }

        for(var feed=0; feed<allFeeds.length; feed++){
            testEachObjInallFeeds(feed);
        }

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
    /*    it('has the url defined and not empty', function(){
            for(var i=0; i<allFeeds.length; i++){
                console.log(allFeeds[i].name.length);
                expect(allFeeds[i].url).toMatch(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/);
            }
        }); */

        function testEachURLInallFeeds(index){
            it('has the URL defined and that the URL is not empty for allfeeds['+index+'].url', function(){
                expect(allFeeds[index].url.length).not.toBe(0);
                expect(allFeeds[index].url).toMatch(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/);
            });
        }

        for(var feed=0; feed<allFeeds.length; feed++){
            testEachURLInallFeeds(feed);
        }

    });


    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
         it('element hidden by default', function(){
            // check if body tag has the class 'menu-hidden'
            expect( $('body').hasClass( 'menu-hidden' ) ).toBeTruthy();
         });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility when the menu icon is clicked', function(){
            $('.menu-icon-link').click();
            expect( $('body').hasClass( 'menu-hidden' ) ).toBeFalsy();
            $('.menu-icon-link').click();
            expect( $('body').hasClass( 'menu-hidden' ) ).toBeTruthy();
          });
    });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

    describe('Initial Entries', function() {

        beforeEach(function(done){
            // run the asyn loadFeed function before testing
            loadFeed(0,done);
        });
        //makes sure after the loadFeed function runs we have something inside of the .feed container
        it('loadFeed() is called, makes sure .feed container has at least a single .entry element', function(){
            expect( $('.feed .entry-link').length ).not.toBe(0);
        });

    });


        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
    describe('New Feed Selection', function() {

        var entryHeader, header;

        beforeEach(function(done){
            //Run the asyn loadFeed function recursively, needs to be ran twice to check if content changes.
            loadFeed(1, function(){
                // We use the first entry header h2 title & and the header of the feed
                entryHeader = $('.entry-link .entry h2').html();
                header = $('.header .header-title').html();
                loadFeed(2, function(){
                    done();
                });
            });

        });

        it('checks if feeds changes', function(){
            //checks if the entry header and feed header change.
            expect( $('.entry-link .entry h2').html() ).not.toBe(entryHeader);
            expect( $('.header .header-title').html() ).not.toBe(header);
        });

    });

    /* Test that ensures when a new feed is added by the addFeed() function
     * that the content actually is added to allFeeds object
     */

    describe('Upload new RSS feed', function() {

        var newRSS = { name: "Smashing Magazine",
                        url: "https://www.smashingmagazine.com/feed/" }

        addFeed(newRSS);

        it('check allFeeds array for new feed object', function(){
            expect(allFeeds[allFeeds.length-1]).toEqual(newRSS);
        });

    });

    /* Test that ensures when a feed is deleted by the deleteFeed() function
     * that the content actually is deleted in the allFeeds object.
     */

    describe('Delete RSS feed', function() {

    //saves current length of allFeed array
    var len = allFeeds.length;
    //saves the feed obj thats going to be deleted
    var feed = allFeeds[0];
    //runs the deleteFeed function
    deleteFeed(0);

    xit('check allFeeds array for removal of feed object', function(){
        //checks if the allFeed length has been reduced by one
        expect(allFeeds.length).toEqual(len-1);
        //checks if the obj isnt the same as the one deleted
        expect(allFeeds[0]).not.toEqual(feed);
    });

    });


}());
