<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="CreatePoll.aspx.cs" Inherits="Kvorum_App.Manager.CreatePoll" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .variants {
            width: 60%;
            margin-bottom: 0.5em;
        }

            .variants button {
                margin-top: 0;
            }

            .variants input[type=file] {
                float: right
            }

            .variants input[type=text] {
                width: 45%;
            }

            .variants img {
                width: 15%;
                float: right;
                margin-right: 30%;
            }

        .variant i {
            font-size: 14px;
            float: right;
        }

        .delQuest {
            float: left;
            margin-right: 1em;
            position: relative;
            top: 0.5em;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <h1>Создание/редактирование опроса</h1>
     <br/>
    <br style="clear: both;">
    <div class="padd20">
    <label>Сроки проведения опроса:&nbsp;</label>
    <input type="date" id="dateVoteStart" onkeyup="GetDatePoll_And_Control(this,5)" onchange="  GetDatePoll_And_Control(this,5)" required="required">
    —
            <input type="date" id="dateVoteEnd"  onkeyup="GetDatePoll_And_Control(this,5)" onchange="  GetDatePoll_And_Control(this,5)"   required="required">.
			<br>
    <br>

    <input type="checkbox" title="Если активировано данное поле, то, после того как пользователь проголосовал, в карточке опроса ему будет отображаться текущая статистика опроса (если число проголосовавших превысило число, указанное в настройках опроса)" id="resOnline">
    <label id="rnumH" title="Если активировано данное поле, то, после того как пользователь проголосовал, в карточке опроса ему будет отображаться текущая статистика опроса (если число проголосовавших превысило число, указанное в настройках опроса)">Результаты онлайн</label>
    <br>

    <label id="rnumH">Показывать после того, как проголосовали (чел.)</label>
    <input type="number" id="resAfterNum" style="max-width: 5em;">

    <br>
    <br>

    <label>Тема опроса</label>
    <br>
    <input type="text" id="VoteThemeText" class="col-md-6 col-xs-12">
    <br>
    <br style="clear: both;">
    <label>Описание</label>
    <br>
    <textarea id="TextVote" name="editor1" class="col-md-6 col-xs-12"></textarea>
    <br>
    <br>
    <br style="clear: both;">
    <label>Прикрепленное изображение</label>
    <input type="file"    onchange="flPolls(this,5)">
    <br>


    <hr noshade="" style="height: 1px; width: 50%; position: initial;">
    <label>Проект, к которому относится опрос</label>
    <br>
    <input type="radio" id="forProject" checked="checked" name="voteFor" data-project="3">
    <span style="margin-right: 15px" id="forAlbl"></span>
    <input type="radio" name="voteFor" id="forAll"><span>Для всех</span>
    <hr noshade="" style="height: 1px; width: 50%; position: initial;">

    <div id="question" class="question">
        <button id="delQuest1" onclick="RemoveQuestion(this)" class="delQuest"><i class="fa fa-close"></i></button>
        &nbsp;<label>Вопрос</label><br>
        <textarea rows="4" id="voteText1" cols="50">Текст вопроса
			</textarea>

        <br>

        <p>Варианты ответа:</p>
        <div style="margin-bottom: -10px; margin-top: -20px;">
            <br>
            <input type="radio" checked="checked" id="selType_one" name="selType">
            <span style="margin-right: 15px">Множественный выбор</span>
            <input type="radio" name="selType" id="selType_many" style=""><span> Единичный выбор</span>
        </div>
        <ul style="margin: 2em 0 0.5em 0;">
            <li class="variants">
                <button onclick="removeVariant(this)" class=""><i class="fa fa-close"></i></button>
                &nbsp;<input type="file"   onchange="flPolls(this)"><input type="text" id="voteQ1V1">
            </li>
            <br>
            <li class="variants">
                <button onclick="removeVariant(this)" class=""><i class="fa fa-close"></i></button>
                &nbsp;<input type="file"  onchange="flPolls(this)"><input type="text" id="voteQ1V2">
            </li>
        </ul>
        <button id="addQuestVar" onclick="AddVariant(this)" style="padding: 0.3em;"><i class="fa fa-plus"></i></button>
        &nbsp;Добавить вариант ответа
    </div>
    <br>
   

    <button id="addQuest" onclick="AddQuestion(this)" style="padding: 0.3em;"><i class="fa fa-plus"></i>&nbsp;Добавить вопрос</button>

    <div class="space40"></div>

    <div class="buttons1">
        <button id="backto" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156);">Назад</button>
        <button id="ShowNews" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233); width: auto;">Предварительный просмотр</button>
        <button id="SavePublish" class="btn btn-default logBtn" type="button" style="width: auto;">Опубликовать опрос</button>
        <button id="SaveNews" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233); width: auto;">Сохранить</button>
    </div>
        </div>


</asp:Content>
