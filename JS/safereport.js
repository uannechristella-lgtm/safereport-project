function toggleName()
{
	var radios = document.forms["reportform"].reportType;
	var nameField = document.getElementById("nameFieldGroup");

	if (radios[1].checked)
	{
		nameField.style.display = "block";
	}
	else
	{
		nameField.style.display = "none";
	}
}

function validate_required(field, alerttxt)
{
	with (field)
	{
		if (value == null || value == "")
		{
			alert(alerttxt);
			return false;
		}
		else
		{
			return true;
		}
	}
}

function validate_email(field, alerttxt)
{
	with (field)
	{
		if (value == "")
		{
			return true;
		}
		apos = value.indexOf("@");
		dotpos = value.lastIndexOf(".");
		if (apos < 1 || dotpos - apos < 2)
		{
			alert(alerttxt);
			return false;
		}
		else
		{
			return true;
		}
	}
}

function validate_form(thisform)
{
	with (thisform)
	{
		if (validate_required(description, "Please describe what happened before submitting.") == false)
		{
			description.focus();
			return false;
		}
		if (validate_email(email, "Please enter a valid email address, or leave it blank.") == false)
		{
			email.focus();
			return false;
		}
	}
	return true;
}

function showConfirmation()
{
	var queryString = window.location.search;
	var params = queryString.substring(1).split("&");
	var name = "";
	var reportType = "";
	var category = "";

	for (var i = 0; i < params.length; i++)
	{
		var pair = params[i].split("=");
		if (pair[0] == "name")
		{
			name = decodeURIComponent(pair[1]).replace(/\+/g, " ");
		}
		if (pair[0] == "reportType")
		{
			reportType = decodeURIComponent(pair[1]);
		}
		if (pair[0] == "category")
		{
			category = decodeURIComponent(pair[1]).replace(/\+/g, " ");
		}
	}

	if (reportType == "named" && name != "")
	{
		document.getElementById("confirmationMessage").innerHTML = "Thank you, " + name + ". Your report has been received and will be handled with confidentiality and respect.";
	}

	showMatchingServices(category);
}

function normalizeCategory(value)
{
	return (value || "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, " ")
		.trim();
}

function showMatchingServices(category)
{
	var container = document.getElementById("resultsList");
	var items = container ? container.getElementsByClassName("card") : [];
	var message = document.getElementById("resultsMessage");
	var matchCount = 0;
	var normalizedCategory = normalizeCategory(category);
	var i;

	if (!container || !message)
	{
		return;
	}

	for (i = 0; i < items.length; i++)
	{
		var itemCategory = items[i].getAttribute("data-category");
		var normalizedItemCategory = normalizeCategory(itemCategory);

		if (normalizedCategory == "" || normalizedItemCategory == normalizedCategory)
		{
			items[i].style.display = "";
			matchCount++;
		}
		else
		{
			items[i].style.display = "none";
		}
	}

	if (matchCount == 0)
	{
		for (i = 0; i < items.length; i++)
		{
			items[i].style.display = "";
		}
		message.innerHTML = "We don't have a specific match for \"" + category + "\" yet, but here are all our support services.";
	}
	else
	{
		message.innerHTML = "Here are services matching \"" + category + "\":";
	}
}
     
