
var code
var symbols="abcdefghijklmnopqrstuvwxyz-"
var vowels="aeiou";
var c_symbols="ABCDEFGHIJKLMNOPQRSTUVWXYZ-"
digits = '0123456789';
var fire_fox=!document.all;
var dobj, solving_flag =0;
var key_len;

var numb_long_cols, numb_short_cols, buf_len, numb_rows;
var min_start = new Array();
var max_start  = new Array();
var max_diff = new Array();
var col_pos = new Array();
var inverse_pos = new Array();
var final_decrypt = new Array();
var columns_selected = new Array();

var rep_index = new Array(); // to mark which columns are leftmost of repeat, rightmost of repeat, or free
var max_rep = new Array(); // tells number of repeated key letters associated with the column.

var old_top_pixel = new Array(); // so Safari web browser can tell if there has been vertical scrolling

// letters to be colored
var red_let = '';
var green_let = '';
var blue_let = '';
var cyan_let='';


var cribtext='';
var crib_row = -1;

function s_compare(a,b) {
		return b[1]-a[1]
}		

function save_to_disk(){
	var i,j, str;
	
	if (typeof(localStorage) == 'undefined' ) {
		show_box(0,'Your browser does not support HTML5 localStorage. Try Chrome.');
	} 
	else {
		try {
			localStorage.setItem("myszkowski.cipher", code); //saves to the database, “key”, “value”
			localStorage.setItem("myszkowski.period", key_len);
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
			show_box(0,'Quota exceeded!'); //data wasn’t successfully saved due to quota exceed so throw an error
			}
		}
	}

	str = '';
	for (i=0;i < key_len;i++) {
		str += col_pos[i]+':';
	}
	localStorage.setItem("myszkowski.colOrder", str);
	str = '';
	for (i=0;i < key_len;i++) {
		str += max_rep[i]+':';
	}
	localStorage.setItem("myszkowski.maxRep", str);
	str = '';
	for (i=0;i < key_len;i++) {
		str += rep_index[i]+':';
	}
	localStorage.setItem("myszkowski.repIndex", str);
	str = '';
	for (i=0;i < key_len;i++) {
		str += old_top_pixel[i]+':';
	}
	localStorage.setItem("myszkowski.topPixel", str);

	show_box(0,"Work saved on disk");

}

function get_from_disk(){
	var s,i,j,k;
    var temp;

	temp = localStorage.getItem("myszkowski.cipher");
	if (temp == undefined){
		show_box(0,"No cipher stored");
		return
	}
    code = temp;
	key_len = parseInt(localStorage.getItem("myszkowski.period"));
    document.ciphertext.cipher_place.value = code;
    s = initialize_buttons();
	document.getElementById('key_lenblock').innerHTML=s;			
	setup_code_columns();
    s = localStorage.getItem("myszkowski.colOrder")
    s = s.split(':');
    for (i=0;i<key_len;i++)
        col_pos[i] = parseInt(s[i]);
    s = localStorage.getItem("myszkowski.maxRep")
    s = s.split(':');
    for (i=0;i<key_len;i++)
        max_rep[i] = parseInt(s[i]);
    s = localStorage.getItem("myszkowski.repIndex")
    s = s.split(':');
    for (i=0;i<key_len;i++)
        rep_index[i] = parseInt(s[i]);
    restore_columns();
    //  reset top pixels
    s = localStorage.getItem("myszkowski.topPixel")    
    s = s.split(':');
    for (i=0;i<key_len;i++) {
        j = 'col'+i;
        k = parseFloat(s[i]);
        document.getElementById(j).scrollTop = k;
    }
    check_top_pixels();
}

function clear_disk(){
	localStorage.removeItem("myszkowski.cipher");
	localStorage.removeItem("myszkowski.period");
	localStorage.removeItem("myszkowski.colOrder");    
	localStorage.removeItem("myszkowski.maxRep");    
	localStorage.removeItem("myszkowski.repIndex");    
	localStorage.removeItem("myszkowski.topPixel");        
	show_box(0,"work cleared from disk");
}

//document.getElementById('get_from_disk1').onclick=get_from_disk();
/*
document.addEventListener('DOMContentLoaded', function () {
  //document.querySelector('button').addEventListener('click', clickHandler);
  document.getElementById('get_from_disk1').addEventListener('click', get_from_disk);
});
*/

onload = function() {
    document.getElementById('get_from_disk1').onclick=get_from_disk;
}

