# Udacity's Front End Web Development Nanodegree

## Project 6 - Feed Reader Testing

Use the Jasmine framework to create test suites that will test the functionality of a web-based application that reads RSS feeds.

## About

In this project I learned the value in testing. Up to this point I've done my testing manually by refactoring my code and refreshing the browser even though this works, if my web app gets big and complex I may end up missing testing a particular part of it. This is why a testing framework like Jasmine is important. Also using a framework like Jasmine also allows you to develope in a whole different way, called Test Driven Development where you write you tests first and then develope your app.

## Files
Overview of important files

jasmine/spec/feedreader.js // spec file that contains all test, and that jasmine will use

js/app.js // main feedreader application

/index.html // run this to start the web app

## Grunt
Grunt is used to run `jshint` on js/app.js jasmine/spec/feedreader.js and gruntfile.js

## Test Suites
This tests are found inside the spec file jasmine/spec/feedreader.js

###RSS Feeds
Tests to make sure that the allFeeds variable has been defined and that it is not empty.
```javascript
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
```
Test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
```javascript
        it('allFeed object has a name defined and that the name is not empty', function(){
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
            }
        });
```
Test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
```javascript
        it('allFeed[n].url are defined and not empty', function(){
            for(var i=0; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toMatch(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/);
            }
        });
```
###The menu
Test that ensures the menu element is hidden by default.
```javascript
         it('Menu element hidden by default', function(){
            // check if body tag has the class 'menu-hidden'
            expect( $('body').hasClass( 'menu-hidden' ) ).toBeTruthy();
         });
```
Test that ensures the menu changes visibility when the menu icon is clicked.
```javascript
          it('Menu changes visibility when the menu icon is clicked', function(){
            $('.menu-icon-link').click();
            expect( $('body').hasClass( 'menu-hidden' ) ).toBeFalsy();
            $('.menu-icon-link').click();
            expect( $('body').hasClass( 'menu-hidden' ) ).toBeTruthy();
          });
```
###Initial Entries
Test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
```javascript
        beforeEach(function(done){
            // run the asyn loadFeed function before testing
            loadFeed(0,function(){
                done();
            });
        });
        //makes sure after the loadFeed function runs we have something inside of the .feed container
        it('loadFeed() called, makes sure .feed container has at least a single .entry element', function(){
            expect( $('.feed .entry-link').length ).not.toBe(0);
        });
```

###New Feed Selection
Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
```javascript
        var entryHeader, header;

        beforeEach(function(done){
            //Run the asyn loadFeed function recursively, needs to be ran twice to check if content changes.
            loadFeed(0, function(){
                // We use the first entry header h2 title & and the header of the feed
                entryHeader = $('.entry-link .entry h2').html();
                header = $('.header .header-title').html();
                console.log(entryHeader);
                console.log(header);
                loadFeed(1, function(){
                    done();
                });
            });

        });

        it('check if feeds changes', function(){
            //checks if the entry header and feed header change.
            expect( $('.entry-link .entry h2').html() ).not.toBe(entryHeader);
            expect( $('.header .header-title').html() ).not.toBe(header);
        });
```

# Resources Used
JavaScript Regex to match a URL in a field of text
http://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text

Discussion Forum/feed-reader-testing-project
https://discussions.udacity.com/c/nd001-project-6-feed-reader-testing/feed-reader-testing-project
