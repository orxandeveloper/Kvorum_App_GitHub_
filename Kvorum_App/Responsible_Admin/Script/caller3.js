$(document).ready(function () {
    //$('#callerDiv').load('phone.html');		
    //$('#callerDiv').load('phone.html');
    $.ajax({
        url: '../Disp_Admin/Script/phone.html',
        type: "GET",
        dataType: "html"
    }).done(function (data) {
        $("#callerDiv").html(data);
        $('#callerDiv').hide();
        $('#delDigit').hide();
        
        $('#callerCall').click(function () {
            if ($('#inputNumber').val().length > 0) { $('#delDigit').show() } else { $('#delDigit').hide() }
            $('#callerDiv').show();
        });
        
        //$('.phoneBtn').click(function () { alert("digits"); });
        $('#answer').click(ClickGreen);
		var sip_phone = sessionStorage.getItem("DispPhoneNumber");
		var pwd = sessionStorage.getItem("PhonePwd"); 
        var purl = sessionStorage.getItem("PhoneUrl");
		console.log('purl =' +purl);
		console.log('pwd =' +pwd);
		
        var socket = new JsSIP.WebSocketInterface('wss://'+purl+':8089/ws');
		
        if (!sip_phone) {
            $('#scrnSmall').text("FAIL");
        } else {
            $('#scrnSmall').text(sip_phone);
        }
        var configuration = {
            'uri': sip_phone + '@'+purl,
            'password': pwd,
			'ws_servers': 'wss://'+purl+':8089/ws',
            sockets: [socket],
			//hack_via_tcp: true,
			//use_preloaded_route: true,
			register: true			
        };

        var incomingCallAudio = new window.Audio('Ringtone.mp3');
        incomingCallAudio.loop = true;
        var remoteAudio = new window.Audio();
        remoteAudio.autoplay = true;

        var callOptions = {
            mediaConstraints: { audio: true, video: false },
            pcConfig: { rtcpMuxPolicy: "negotiate" }
        };
        $('#close_phone').click(function () {
            if ($('#inputNumber').val().length > 0) { $('#delDigit').show() } else { $('#delDigit').hide() }
            $('#callerDiv').hide();
            hangup();
        });

        var phone;
		
		var disp_name = $('#DispName').text();
        disp_name = disp_name.substring(0, disp_name.length -3);
        $('#hdr').text(disp_name);
        $('#scrnBig').text(disp_name);
		
        if (configuration.uri && configuration.password) {
            JsSIP.debug.enable('JsSIP:*'); // more detailed debug output
            phone = new JsSIP.UA(configuration);
            phone.on('registrationFailed', function (ev) {
                alert('Входящие и исходящие звонки недоступны! Ошибка: ' + ev.cause);
                //configuration.uri = null;
                //configuration.password = null;
                updateUI();
            });
            phone.on('newRTCSession', function (ev) {
                $('#callButtons').show();
                var newSession = ev.session;
                if (session) { // hangup any existing call
                    session.terminate();
                }
                session = newSession;
                var completeSession = function () {
                    session = null;
                    $('#callerDiv').hide();
                    updateUI();
                    hangup();
                };
                session.on('ended', completeSession);
                session.on('failed', completeSession);
                session.on('accepted', updateUI);
                session.on('confirmed', function () {
                    var localStream = session.connection.getLocalStreams()[0];
                    var dtmfSender = session.connection.createDTMFSender(localStream.getAudioTracks()[0])
                    session.sendDTMF = function (tone) {
                        dtmfSender.insertDTMF(tone);
                    };
                    updateUI();
                });
                session.on('addstream', function (e) {
                    incomingCallAudio.pause();
                    remoteAudio.src = window.URL.createObjectURL(e.stream);
                });

                if (session.direction === 'incoming') {
                    incomingCallAudio.play();
                    console.log("playing stream......");
                    $('#callButtons').hide();
                    $('#callerDiv').show();
                    $('#inputNumber').val(session.remote_identity);
                    //$('#callHeader').html("Входящий звонок");

                    /*    $('#answer').click(function () {                    
                        
                        });
                        */
                }
                else {
                    $('#callButtons').show();
                }

                
                $('#answer').click(function () {
                    ClickGreen();
                });

                $('#inputNumber').keypress(function (e) {
                    if (e.which === 13) {//enter
                        var dest = $('#inputNumber').val();
                        phone.call(dest, callOptions);
                    }
                });
                $('#drop').click(hangup);




                updateUI();
            });
            phone.start();
        }

        var session;
        updateUI();



        var hangup = function () {
            if (session) session.terminate();
            $('#callerDiv').hide();
            $('#callButtons').show();
            $('#inputNumber').val('');
            $('#answer').show();

        };



        $('#mute').click(function () {
            console.log('MUTE CLICKED');
            if (session.isMuted().audio) {
                session.unmute({ audio: true });
            } else {
                session.mute({ audio: true });
            }
            updateUI();
        });
        $('#inputNumber').keypress(function (e) {
            if (e.which === 13) {//enter
                $('#answer').click();
            }
        });
        $('#inputNumber').on('input', function (e) {
            if ($('#inputNumber').val().length > 0) { $('#delDigit').show() } else { $('#delDigit').hide() }
        });
        $('#delDigit').click(function () {
            $('#inputNumber').val($('#inputNumber').val().slice(0, -1));
            if ($('#inputNumber').val().length > 0) { $('#delDigit').show() } else { $('#delDigit').hide() }
        });

        $('#callButtons').on('click', '.phoneBtn', function (e) {

            var $target = $(e.target);
            var value = $target.data('value');
            //console.log(e);
            $('#inputNumber').val($('#inputNumber').val() + e.target.innerText);
            if ($('#inputNumber').val().length > 0) { $('#delDigit').show() } else { $('#delDigit').hide() }
            //session.sendDTMF(value.toString());
        });

        function ClickGreen() {
            if ((session) && (session.direction == 'incoming')) {
                session.answer(callOptions);
                session.connection.addEventListener('addstream', function (event) {
                    //console.log("Debug: addstream............");
                    incomingCallAudio.pause();
                    remoteAudio.src = window.URL.createObjectURL(event.stream);
                });
                $('#answer').hide();
            }
            else {
                var dest = $('#inputNumber').val();
                phone.call(dest, callOptions);
            }
        }

        function updateUI() {
            if (session) {
                if (session.isInProgress()) {
                    if (session.direction === 'incoming') {
                        //$('#callHeader').html(session.remote_identity.uri);
                        $('#callerDiv').show();
                    } else {
                        $('#callInfoText').html('Ringing...');
                        //$('#callHeader').html(session.remote_identity.uri.user);
                        $('#callerDiv').show();
                    }
                } else if (session.isEstablished()) {
                    // $('#callHeader').html(session.remote_identity.uri.user);
                    incomingCallAudio.pause();
                }
            } else {
                incomingCallAudio.pause();
            }
            //microphone mute icon
            if (session && session.isMuted().audio) {
                $('#muteIcon').addClass('fa-microphone-slash');
                $('#muteIcon').removeClass('fa-microphone');
            } else {
                $('#muteIcon').removeClass('fa-microphone-slash');
                $('#muteIcon').addClass('fa-microphone');
            }

        }




    }).fail(function (jqXHR, textStatus, errorThrown) {
        $("#callerDiv").html("Error!! File is not loaded");
    });


});