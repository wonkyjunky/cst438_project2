$.post_json = (api_url, obj, callback) =>
{
	return $.ajax({
	type:"POST",
	url: api_url,
	contentType: "application/json",
	data: JSON.stringify(obj),
	success: callback,
	error: (jqXHR) => { callback(jqXHR.responseJSON) }
	});
}