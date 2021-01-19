$(function () {
    var loc = window.location.pathname

    $('[required="required"]').attr('style', 'box-shadow: inset 0 1px 1px, 0 0 8px red;border: 1px solid red;')
})
function ModalDocHistory()
{
    $('#ModalDocHistory').show();
    closeExChangedoc()
}
function closeDocHistoryPop() {
    $('#ModalDocHistory').hide(); 
}
function ExChangeDoc()
{
    $('#ModalExChangeDoc').show();
    closeHistoryPop();
}
function closeExChangedoc()
{
    $('#ModalExChangeDoc').hide()
}
function changePersData()
{
    $('#ModalChangePers').show()
}
function closechangePersData() {
    $('#ModalChangePers').hide()
}
function changesHistory()
{
    $('#ModalHistory').show()
}
function closeHistoryPop()
{
    $('#ModalDocHistory').hide()
}