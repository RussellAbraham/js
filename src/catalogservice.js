
/*****************************
 *  Catalogue Service JS API
 *****************************/

 /***  Catalog Service Constants ***/
 var CONTENT_TYPE_MUSIC   = "musicrelease";
 var CONTENT_TYPE_VIDEO     = "video";
 var CONTENT_TYPE_CONTENT = "content";
 var CONTENT_TYPE_REVIEW = "reviews";
 
 
 var PRODUCT_TYPE_LIST = "pt_listing";
 var PRODUCT_TYPE_APPS = "apps";
 var PRODUCT_TYPE_GAMES = "games";
 var PRODUCT_TYPE_APPS_GAMES = "apps_games";
 var PRODUCT_TYPE_B4BB_APPS = "b4bb_apps";
 var PRODUCT_TYPE_B4BB_GAMES = "b4bb_games";
 var PRODUCT_TYPE_B4BB_APPS_GAMES = "b4bb_apps_games";
 var PRODUCT_TYPE_THEMES = "themes";
 var PRODUCT_TYPE_RINGTONES = "ringtones";
 var PRODUCT_TYPE_MUSIC = "music";
 var PRODUCT_TYPE_MUSIC_TRACK = "music_track";
 var PRODUCT_TYPE_VIDEO_TV = "video_tv";
 var PRODUCT_TYPE_VIDEO_TV_EPISODES = "video_tv_episode";
 var PRODUCT_TYPE_VIDEO_TV_SHOW = "video_tv_show";
 var PRODUCT_TYPE_VIDEO_MOVIE = "video_movie";
 var PRODUCT_TYPE_VIDEO = "video";
 var PRODUCT_TYPE_ALL = "all";
 var PRODUCT_TYPE_PRODUCTS = "products";
 
 var LIST_TYPE_TOP_FREE = "top_free";
 var LIST_TYPE_TOP_PAID = "top_paid";
 var LIST_TYPE_TOP_RATED = "top_rated";
 var LIST_TYPE_TOP_GROSSING = "top_grossing";
 var LIST_TYPE_TRENDING = "trending";
 var LIST_TYPE_SIMILAR = "similar";
 var LIST_TYPE_HISTORY = "history";
 var LIST_TYPE_NEWEST = "newest";
 var LIST_TYPE_EMU = "emu";
 var LIST_TYPE_CATEGORY_LISTING = "category_listing";
 var LIST_TYPE_SEARCH_LISTING = "search_listing";
 var LIST_TYPE_B4BB = "b4bb";
 var LIST_TYPE_EMU_LISTING = "emu_listing";
 var LIST_TYPE_SUB_CONTENT_LISTING = "sub_content_listing";
 
 var CATEGORY_TYPE_CATEGORY = "category";
 var CATEGORY_TYPE_SUBCATEGORY = "subcategory";
 
 var VENDOR_TYPE_VENDOR = "vendor";
 var VENDOR_TYPE_ARTIST = "artist";
 var VENDOR_TYPE_ARTIST_LIST = "artist_list";
 var VENDOR_TYPE_ACTOR = "actor";
 var VENDOR_TYPE_PRODUCER = "producer";
 var VENDOR_TYPE_WRITER = "writer";
 var VENDOR_TYPE_DIRECTOR = "director";
 var VENDOR_TYPE_STUDIO = "studio";
 
 var LICENSE_TYPE_ALL = "all";
 var LICENSE_TYPE_PAID = "paid";
 var LICENSE_TYPE_FREE = "free";
 
 
 /***  Catalog Service API ***/
 
 /* All functions below take a requestProfile and a callback function name.
  * 
  *  requestProfile - we tag the given requestProfile to the end of the URL unmodified.
  * 						This is to allow you to specify page, number of resuls and other query
  * 						parameters that the server may require. Just pass null 
  * 						in cases that you don't need to modify the params.
  *  callback - The callback function is called when the results are returned with one parameter 
  *  			that is the returned json object. 
  */
 
 // Get Functions
 
 // returns content for given content type
 function getContentById(contentType, contentId, requestProfile, callback) { formAndSendQuery("", "", "", "", "", "", contentType, contentId, "",  requestProfile, callback);}
 
 // returns tracks for albums or tv seasons for tv shows and episodes for tv seasons
 function getSubContentListing(productType, subContentId, requestProfile, callback) { formAndSendQuery(productType, LIST_TYPE_SUB_CONTENT_LISTING, "", "", "", "", "", subContentId, "",  requestProfile, callback); }
 function getMusicTracksForAlbum(albumId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_MUSIC_TRACK, LIST_TYPE_SUB_CONTENT_LISTING, "", "", "", "", "", albumId, "",  requestProfile, callback); }
 function getMusicTracksForArtist(artistId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_MUSIC_TRACK, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_ARTIST, artistId, "", "", "",  requestProfile, callback); }
 function getTVEpisodesBySeasonId(seasonId, requestProfile, callback) {         formAndSendQuery(PRODUCT_TYPE_VIDEO_TV,          LIST_TYPE_SUB_CONTENT_LISTING, "", "", "", "", "", seasonId, "",  requestProfile, callback); }
 function getTVSeasonsByShowId(showId, requestProfile, callback) {         formAndSendQuery(PRODUCT_TYPE_VIDEO_TV,          LIST_TYPE_SUB_CONTENT_LISTING, "", "", "", "", "", showId, "",  requestProfile, callback); }
 
 // returns list of subcategories
 function getSubCategoryById(productType, listType, subCategoryId, requestProfile, callback) { formAndSendQuery(productType, listType, CATEGORY_TYPE_SUBCATEGORY, "", "", "", "", subCategoryId, "",  requestProfile, callback); }
 
 // Returns carousel content (aka emu) for a given product type
 function getCarousel(productType, requestProfile, callback) { formAndSendQuery(productType, LIST_TYPE_EMU, "", "", "", "", "", "", "",  requestProfile, callback);}
 function getEMU(emuId, productType, requestProfile, callback) { formAndSendQuery(productType, LIST_TYPE_EMU_LISTING, CATEGORY_TYPE_CATEGORY, "0", "", "", "", emuId, "",  requestProfile, callback);}
 
 function getReviews(contentId, releaseVersion, requestProfile, callback) { formAndSendReviewQuery(contentId, releaseVersion,  requestProfile, callback);}
 
 // Returns all content for a product type
 function getProductType(productType, requestProfile, callback) { formAndSendQuery(productType, "", "", "", "", "", "", "", "",  requestProfile, callback); }
 
 // Returns list of all supported Product Types
 function getProductTypeList(requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_LIST, "", "", "", "", "", "", "", "",  requestProfile, callback); }
 function getListType(productType, listType, requestProfile, callback) { formAndSendQuery(productType, listType, "", "", "", "", "", "", "",  requestProfile, callback); }
 function getCategory(productType, categoryId, requestProfile, callback) { formAndSendQuery(productType, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY, categoryId, "", "", "", "", "",  requestProfile, callback); }
 
 function getVendor(vendorId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_PRODUCTS, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_VENDOR, vendorId, "", "", "",  requestProfile, callback); }
 
 function getMusicArtist(artistId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_MUSIC, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_ARTIST, artistId, "", "", "",  requestProfile, callback); }
 function getMusicArtistWithListType(artistId, listType, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_MUSIC, listType, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_ARTIST, artistId, "", "", "",  requestProfile, callback); }
 
 // Use this API for Acotrs and Writers.  Searching by cast name is the best we can do until the SOLR guys add indexes so we can look up Actors and Writers by ID.
 function getTVByCastName(castName, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_ACTOR, castName, "", "", "",  requestProfile, callback); }
 function getMoviesByCastName(castName, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_ACTOR, castName, "", "", "",  requestProfile, callback); }
 
 //NOT INDEXED IN SOLR YET function getTVActor(actorId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_ACTOR, actorId, "", "", "",  requestProfile, callback); }
 function getTVProducer(producerId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_PRODUCER, producerId, "", "", "",  requestProfile, callback); }
 //NOT INDEXED IN SOLR YET function getTVWriter(writerId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_WRITER, writerId, "", "", "",  requestProfile, callback); }
 function getTVDirector(directorId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_DIRECTOR, directorId, "", "", "",  requestProfile, callback); }
 
 function getTVStudio(studioName, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV_SHOW, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_STUDIO, studioName, "", "", "",  requestProfile, callback); }
 
 //NOT INDEXED IN SOLR YET function getMovieActor(actorId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_ACTOR, actorId, "", "", "",  requestProfile, callback); }
 function getMovieProducer(producerId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_PRODUCER, producerId, "", "", "",  requestProfile, callback); }
 //NOT INDEXED IN SOLR YET function getMovieWriter(writerId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_WRITER, writerId, "", "", "",  requestProfile, callback); }
 function getMovieDirector(directorId, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_DIRECTOR, directorId, "", "", "",  requestProfile, callback); }
 
 function getMovieStudio(studioName, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_CATEGORY_LISTING, CATEGORY_TYPE_CATEGORY,  "0", VENDOR_TYPE_STUDIO, studioName, "", "", "",  requestProfile, callback); }
 
 function getCustom(productType, listType, categoryType, categoryId, vendorType, vendorId, contentType, id, search,  requestProfile, callback) { 
     formAndSendQuery(productType, listType, categoryType, categoryId, vendorType, vendorId, contentType, id, search,  requestProfile, callback); }
 
 function getCountriesMetaData(requestProfile, callback) { formAndSendMetaDataQuery("supported/countries", null, requestProfile, callback); }
 function getCarriersMetaData(requestProfile, callback) { formAndSendMetaDataQuery("supported/carriers", null, requestProfile, callback); }
 function getDevicesMetaData(requestProfile, callback) { formAndSendMetaDataQuery("supported/devices", null, requestProfile, callback); }
 function getCategoryTreeMetaData(id, requestProfile, callback) { formAndSendMetaDataQuery("categorytree", id, requestProfile, callback); }
 function getEMUMetaData(id, requestProfile, callback) { formAndSendMetaDataQuery("emu", id, requestProfile, callback); }
 
 function getSimilar(productType, listType, id,  requestProfile, callback) { 
     formAndSendQuery(productType, listType, "", "", "", "", "", id, "",  requestProfile, callback); }
 
 // Search Functions
 function searchProductType(productType, search, requestProfile, callback) { 	formAndSendQuery(productType, LIST_TYPE_SEARCH_LISTING, "", "", "", "", "", "", search,  requestProfile, callback); }
 function searchB4BBWithProductType(productType, search, requestProfile, callback) { 	formAndSendQuery(productType, LIST_TYPE_B4BB, "", "", "", "", "", "", search,  requestProfile, callback); }
 function searchCategory(productType, categoryId, search, requestProfile, callback) { formAndSendQuery(productType, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, categoryId, "", "", "", "", search,  requestProfile, callback); }
 
 function searchVendors(vendorId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_PRODUCTS, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_VENDOR, vendorId, "","", search,  requestProfile, callback); }
 
 function searchMusicTracks(search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_MUSIC_TRACK, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", "", "", "","", search,  requestProfile, callback); }
 function searchMusicArtistById(artistId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_MUSIC, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_ARTIST, artistId, "","", search,  requestProfile, callback); }
 function searchForMusicArtistsByName(artistName, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_MUSIC, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_ARTIST_LIST, "0", "","", artistName,  requestProfile, callback); }
 
 function searchTvEpisodes(search, requestProfile, callback) { 	formAndSendQuery(PRODUCT_TYPE_VIDEO_TV_EPISODES, LIST_TYPE_SEARCH_LISTING, "", "", "", "", "", "", search,  requestProfile, callback); }
 
 // NOTE THAT THE DB DOESN'T SEEM TO HAVE ANY OF THESE SPECIFIED FOR TV????
 function searchTVActor(actorId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_ACTOR, actorId, "","", search,  requestProfile, callback); }
 function searchTVProducer(producerId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_PRODUCER, producerId, "","", search,  requestProfile, callback); }
 function searchTVWriter(writerId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_WRITER, writerId, "","", search,  requestProfile, callback); }
 function searchTVDirector(directorId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_TV, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_DIRECTOR, directorId, "","", search,  requestProfile, callback); }
 
 function searchMovieActor(actorId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_ACTOR, actorId, "","", search,  requestProfile, callback); }
 function searchMovieProducer(producerId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_PRODUCER, producerId, "","", search,  requestProfile, callback); }
 function searchMovieWriter(writerId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_WRITER, writerId, "","", search,  requestProfile, callback); }
 function searchMovieDirector(directorId, search, requestProfile, callback) { formAndSendQuery(PRODUCT_TYPE_VIDEO_MOVIE, LIST_TYPE_SEARCH_LISTING, CATEGORY_TYPE_CATEGORY, "0", VENDOR_TYPE_DIRECTOR, directorId, "","", search,  requestProfile, callback); }
 
 // Workers
 var $j = jQuery.noConflict();
 
 // Default is Prod URL
 var CAS_SERVICE = "http://appworld.blackberry.com/cas";
 var showErrorPopups = false;
 
 /*
  *  Set CAS_URL env var or -DCAS_URL="http://computername.rim.net/cas" in your JBoss startup
  * and it will get plugged in here.
  */  
 function initCatalogueService(casServiceSystemProperty, showErrorPopupsServerSetting) {
     if (isDefined(casServiceSystemProperty)) {
         CAS_SERVICE = casServiceSystemProperty;
     }
     
     if (isDefined(showErrorPopupsServerSetting)) {
         showErrorPopups = showErrorPopupsServerSetting;
     }	
 }
 
 function formAndSendMetaDataQuery(dataType, id,  requestProfile, callback) {
     var queryString = "";
     
     if (dataType == "emu") {
         queryString = "/emu/meta";
     } else {
         queryString = "/metadata/" + dataType;
     }
 
     if (isDefined(id)) {
         queryString += "/" + id;
     }
     sendQuery(queryString, requestProfile, callback);
 }
 
 function formAndSendReviewQuery(contentId, releaseVersion,  requestProfile, callback) {
     var queryString = "/" + CONTENT_TYPE_CONTENT + "/" + contentId + "/" + CONTENT_TYPE_REVIEW + "/" + releaseVersion;
 
     sendQuery(queryString, requestProfile, callback);
 }
 
 function formAndSendQuery(productType, listType, categoryType, categoryId, vendorType, vendorId, contentType, id, search,  requestProfile, callback) {
     var queryString = formQuery(productType, listType, categoryType, categoryId, vendorType, vendorId, contentType, id, search);
 
     sendQuery(queryString, requestProfile, callback);
 }
 
 function formQuery(productType, listType, categoryType, categoryId, vendorType, vendorId, contentType, id, search) {
     var query = "";
     if (isDefined(productType)) {
         query += "/producttype/" + productType;
         if (isDefined(listType)) {
             if (isDefined(listType) && (listType == LIST_TYPE_EMU_LISTING) && isDefined(id)){
                 query += "/listtype/" + LIST_TYPE_EMU_LISTING + "/" + id;
             } else if (!isDefined(vendorType) && !isDefined(vendorId) && isDefined(id) && (listType == LIST_TYPE_SUB_CONTENT_LISTING)) {
                 // /producttype/{pType}/listtype/sub_content_listing/{id}  <-- returns tracks for albums or tv seasons for tv shows and episodes for tv seasons
                 query += "/listtype/" + LIST_TYPE_SUB_CONTENT_LISTING + "/" + id;
             } else {
                 query += "/listtype/" + listType;
                 if (isDefined(categoryType) && isDefined(categoryId)) {
                     query += "/" + categoryType + "/" + categoryId;
                     if (isDefined(vendorType) && isDefined(vendorId)) {
                             query += "/" + vendorType + "/" + vendorId;
                     } else if (isDefined(search)) {
                         // They specified a categoryType and want to search it.
                         //query += "/vendor/0";
                     }
                 }  else if (isDefined(categoryType) && (categoryType == CATEGORY_TYPE_SUBCATEGORY) && isDefined(id)) {
                     // categoryId is not defined, so lets get the subcategory
                     // /producttype/{pType}/listtype/{lType}/subcategory/{id} <- returns list of sub categories
                     query +=  "/" + CATEGORY_TYPE_SUBCATEGORY + "/" + id;
                 }  else if (isDefined(search)) {
                     // They specified a listType and want to search it.
                     query += "/category/0";
                 } else if (isDefined(id) && listType == LIST_TYPE_SIMILAR) {
                     // They specified listType LIST_TYPE_SIMILAR and id.
                     query += "/" + id;
                 }
             }
         } else if (isDefined(search)) {
             // They specified a producttype and want to search it.
             query += "/listtype/category_listing/category/0";
         } else if (productType == "all"){
             // This would request EVERYTHING from the catalog, so lets not do this
             alert("DON'T REQUEST EVERYTHING FROM THE CATALOGUE SERVICE!");
             return "";
         }
     } else if (isDefined(contentType) && isDefined(id)) {
         // They are just looking up content
         query += "/" + contentType + "/" + id;
     } else if (isDefined(search)) {
         // They want to search everything..
         query += "/producttype/all/listtype/category_listing/category/0";
     } else {
         return "";
     }
     
     // Add Search if id is not defined
     if (isDefined(search) && !isDefined(id)) {
         query += "/search/" + search;
     }
     
     return query;	
 }
 
 
 function replaceAll(txt, replace, with_this) {  return txt.replace(new RegExp(replace, 'g'),with_this);}
 
 function sendQuery(queryString, requestProfile, callback){
     
     if (!isDefined(requestProfile)){
         requestProfile = new RequestProfile(null,null,null,null,null,null,null,null);
     } 
     
     try {
         requestProfile.loadFromFilteringCookie();
     } catch(err) {
         //alert("Invalid RequestProfile passed in to CAS API.  You must pass a valid RequestProfile Object or null.  You passed: " + requestProfile);
         requestProfile = new RequestProfile(null,null,null,null,null,null,null,null);
         requestProfile.loadFromFilteringCookie();
     }
     
     var cb =  replaceAll(queryString,"/", "_"); // Switch / to _
     cb = cb.replace(/[^\w]/gi, '_');                 // Get Rid of all special chars
     
     var paramString = requestProfile.toString();
     if (queryString.indexOf('?') != -1){
         if (paramString.lastIndexOf('?', 0) == 0){
             paramString = paramString.replace('?', '&');
         }
     }
     
     var queryUrl = CAS_SERVICE + queryString + paramString;
     var request = $j.ajax(
     { url: queryUrl ,
         type: 'GET',
         dataType: 'jsonp',
         jsonpCallback: cb,
 
         success: function(jsonObj, textStatus, jqXHR)
         {
             // Send the queryUrl to the callback when running testCAS()
             
             if (jsonObj.ldata == null){
                 callback(jsonObj);
             }else if (jsonObj.meta == null){
                 callback(jsonObj.ldata);
             }else{
                 callback(jsonObj.ldata, jsonObj.meta);
             }
         },
         error: function(XHR, textStatus, errorThrown) 
         {
             if(showErrorPopups != undefined && showErrorPopups != null && showErrorPopups!=""){
                 if (showErrorPopups.toLowerCase() == "true"){
                         if (textStatus == "parsererror") {
                             alert("CAS API - jQuery Parser Error - \nStatus: " + textStatus + " \nerrorThorwn: " + errorThrown + " \nmaking the query: " + queryUrl + " \ncallback: " + callback);
             
                                     /*"likely caused by calling the exact same CAS request more " + 
                                     "than once in quick succession and one of the callbacks is not correct.  The querys was: " + queryUrl + 
                                     "Please report this error and the URL of the page you were one when it occured.");*/
                         } else {
                             alert("CAS API ERROR - \nStatus: " + textStatus + " \nerrorThorwn: " + errorThrown + " \nmaking the query: " + queryUrl + " \ncallback: " + callback);
                         }
                 }
             }
         }
     });
     request.fail(function(jqXHR, textStatus, errorThrown) {
         // No need to show the errors twice, they were already displayed in error above.
     });
 }
 
 
 // Helpers
 function isDefined(aVar) {
     if (aVar != null && aVar != undefined && aVar != "") {
         return true;
     }
     return false;
 }
 
 function getProductTypeFromCASQuery(casQuery) {
     var begin = casQuery.indexOf("producttype/", 0);
     if (begin > -1) {
         begin = begin + 12;
         var end = casQuery.indexOf("/", begin);
         return casQuery.substring(begin, end);
     }
     return "";
 }
 
 function setCASQueryProductType(casQuery, newProductType) {
     var productType = getProductTypeFromCASQuery(casQuery);
     return casQuery.replace(productType, newProductType);
 }
 
     /******************* TEST Catalogue Service JS API *******************************/
 function feedback(jsonObj, callbackDesc , expectedResult) {
         if (!isDefined(jsonObj) && expectedResult == 0) {
               //alert("CAS API - Successfull - NO RESULTS EXPECTED - " + callbackDesc);
         } else if (!isDefined(jsonObj)) {
                 //alert("CAS API -jsonObj not defined - " + callbackDesc + " Query: " +  queryUrl);
         } else if (jsonObj.length == 0) {
             //alert("CAS API - " + callbackDesc + " - jsonObj contains no results" + " Query: " +  queryUrl);
         } else if (expectedResult  >=0 && jsonObj.length != expectedResult) {
             alert("CAS API - Invalid Response - " + callbackDesc + ", first app:  " + jsonObj[0].name + ",  number of items (expect " + expectedResult + "): " + jsonObj.length + " Query: " +  queryUrl); 
           } else {
               //alert("CAS API - Successfull - " + callbackDesc + ", first item:  " + jsonObj[0].name + ",  number of items: " + jsonObj.length );
           }
 }
 
 //function testNewAPI() {
 //	getProductTypeList(null, getProductTypeListcallback) ;
 //	function getProductTypeListcallback(jsonObj, queryUrl){
 //		feedback(jsonObj, "getProductTypeListcallback " , -1, queryUrl);
 //	}
 //}
 
 function RequestProfile(os, model, countryid, carrierid, lang, page, pagesize, sortby, licensetype){
     this.id = null;
     this.os = os;
     this.model = model;
     this.countryid = countryid;
     this.carrierid = carrierid;
     this.lang = lang;
     this.page = page;
     this.pagesize = pagesize;
     this.sortby = sortby;
     this.licensetype = licensetype;
     this.carrierName = null;
     this.countryName = null;
     this.deviceImageId = null;
     this.deviceDisplayName = null;
     this.devicePIN = null;
     
     this.incrementPage = function() {
         ++this.page;
     };
     
     this.decrementPage = function() {
         --this.page;
     };
     
     this.toString = function() {
         var queryToken = true;
         var string = "";
         
         var token = function() {
             if (queryToken) {
                 queryToken = false;
                 return "?";
             }
             
             return "&";
         };
         
         if (isDefined(this.os)) string += token() + "os=" + this.os;
         if (isDefined(this.model)) string += token() + "model=" + this.model;
         if (isDefined(this.countryid)) string += token() + "countryid=" + this.countryid;
         if (isDefined(this.carrierid)) string += token() + "carrierid=" + this.carrierid;
         if (isDefined(this.lang)) string += token() + "lang=" + this.lang;
         if (isDefined(this.page)) string += token() + "page=" + this.page;
         if (isDefined(this.pagesize)) string += token() + "pagesize=" + this.pagesize;
         if (isDefined(this.sortby)) string += token() + "sortby=" + this.sortby;
         if (isDefined(this.licensetype)) string += token() + "licensetype=" + this.licensetype;
         
         return string;
     };	
     
     this.loadFromFilteringCookie = function(){
         if (this.os == null){
             this.os = getValue("os", "wsfiltering");
         }
         if (this.model == null){
             this.model = getValueAndDecodeURI("model", "wsfiltering");
         }
         if (this.lang == null){
             this.lang = getValue("lang", "wsfiltering");
         }
         if (this.countryid == null){
             this.countryid = getValue("countryid", "wsfiltering");
         }
         if (this.carrierid == null){
             this.carrierid = getValue("carrierid", "wsfiltering");
         }
         if (this.carrierName == null){
             this.carrierName = getValueAndDecodeURI("carrierName", "wsfiltering");
         }
         if (this.countryName == null){
             this.countryName = getValueAndDecodeURI("countryName", "wsfiltering");
         }
         if (this.deviceImageId == null){
             this.deviceImageId = getValue("deviceImageId", "wsfiltering");
         }
         if (this.deviceDisplayName == null){
             this.deviceDisplayName = getValueAndDecodeURI("deviceDisplayName", "wsfiltering");
         }
         if (this.devicePIN == null){
             this.devicePIN = getValue("devicePIN", "wsfiltering");
         }
     };
     
     this.writeToFilteringCookie = function(){
         this.clearCookie();
         if (isDefined(this.os)){
             addToCookie("os", this.os, "wsfiltering", false);
         }
         if (isDefined(this.model)){
             addToCookie("model", encodeURIComponent(this.model), "wsfiltering", false);
         }
         if (isDefined(this.lang)){
             addToCookie("lang", this.lang, "wsfiltering", false);
         }
         if (isDefined(this.countryid)){
             addToCookie("countryid", this.countryid, "wsfiltering", false);
         }
         if (isDefined(this.carrierid)){
             addToCookie("carrierid", this.carrierid, "wsfiltering", false);
         }
         if (isDefined(this.carrierName)){
             addToCookie("carrierName", encodeURIComponent(this.carrierName), "wsfiltering", false);
         }
         if (isDefined(this.countryName)){
             addToCookie("countryName", encodeURIComponent(this.countryName), "wsfiltering", false);
         }
         if (isDefined(this.deviceImageId)){
             addToCookie("deviceImageId", this.deviceImageId, "wsfiltering", false);
         }
         if (isDefined(this.deviceDisplayName)){
             addToCookie("deviceDisplayName", encodeURIComponent(this.deviceDisplayName), "wsfiltering", false);
         }
         if (isDefined(this.devicePIN)){
             addToCookie("devicePIN", this.devicePIN, "wsfiltering", false);
         }
     };
     this.clearCookie = function() {
         deleteCookie("wsfiltering");
     };
     
     this.clearDeviceInfo = function(writeToFilteringCookie) {
         if (writeToFilteringCookie != false)
             writeToFilteringCookie = true;
         
         this.os = null;
         this.model = null;
         this.countryid = null;
         this.carrierid = null;
         this.carrierName = null;
         this.countryName = null;
         this.deviceImageId = null;
         this.deviceDisplayName = null;
         this.devicePIN = null;
         
         if (writeToFilteringCookie)
             this.writeToFilteringCookie();
     };
 
     this.isDeviceInfoCleared = function() {
         if (!isDefined(this.os) &&
                 !isDefined(this.model) &&
                 !isDefined(this.countryid) &&
                 !isDefined(this.carrierid) &&
                 !isDefined(this.carrierName) &&
                 !isDefined(this.countryName) &&
                 !isDefined(this.deviceDisplayName) &&
                 !isDefined(this.devicePIN) &&
                 !isDefined(this.deviceImageId)) {
             return true;
         }
         
         return false;
     };
 }
 
 function compatibleContent(data) {
     if (data == null ||  data.cdDTO == null) {
         return 'ok';
     }
 
     var model_ok = false;
     var country_ok = false;
     var carrier_ok = false;
 
     var requestProfile = new RequestProfile();
     requestProfile.loadFromFilteringCookie();
 
     var currentModel = requestProfile.model;
     if (isDefined(currentModel) && isDefined(data.cdDTO.supportedDevices)){
         var supportedDevices = data.cdDTO.supportedDevices;
         for (var i = 0 ; i<supportedDevices.length; i++) {
             if (currentModel.toLowerCase() == supportedDevices[i].toLowerCase()) {
                 model_ok = true;
                 break;
             }
         }
         if(!model_ok){
             return 'errorModel';
         }
     }
 
     var currentCountry = requestProfile.countryName;
     if (isDefined(currentCountry) && isDefined(data.cdDTO.supportedCountries)){
         var supportedCountries = data.cdDTO.supportedCountries;
         for (var i = 0 ; i<supportedCountries.length; i++) {
             if (currentCountry.toLowerCase() == supportedCountries[i].toLowerCase()) {
                 country_ok = true;
                 break;
             }
         }
         if(!country_ok){
             return 'errorCountry';
         }
     }
 
     var currentCarrier = requestProfile.carrierName;
     if (isDefined(currentCarrier) && isDefined(data.cdDTO.supportedCarriers)){
         var supportedCarriers = data.cdDTO.supportedCarriers;
         for (var i = 0 ; i<supportedCarriers.length; i++) {
             if (currentCarrier.toLowerCase() == supportedCarriers[i].toLowerCase()) {
                 carrier_ok = true;
                 break;
             }
         }
         if(!carrier_ok){
             // currentCarrier is defined, but it was not found, so lets try again and 
             // sanitize the supportedCarriers as we compare.  Carrier names that contain
             // special characters that have been sanitized do not match, AT&T for example.
             var sanitizeCookieStringPattern = getSanitizeCookieStringPattern();
             for (var i = 0 ; i<supportedCarriers.length; i++) {
                 if (currentCarrier.toLowerCase() == sanitizeString(supportedCarriers[i], sanitizeCookieStringPattern).toLowerCase()) {
                     carrier_ok = true;
                     break;
                 }
             }
             
         }
         if(!carrier_ok){
             return 'errorCarrier';
         }
     }
     
     return 'ok';
     
 }
 