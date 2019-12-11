
import datetime
import flask

import time


app = flask.Flask(__name__)
app.secret_key = 'cdfsfds'

messages = 0
newmessages = 0
messagelist = []
sep = "<<|>>"


def syncMessageList():
    messages = open("all.log", "r")
    messageList = []
    for i in messages.read():
        messageList.append(i)




# @app.route('/stream')
# def stream():
#     def event_stream():
#         global newmessages, messagelist, messages
#         while True:
#             if newmessages>0:
#                 latestmessage = messagelist[messages]
#                 messages+=1
#                 newmessages-=1
#                 app.logger.info(str(latestmessage, messagelist, newmessages))
#                 return latestmessage
    
#     return flask.Response(str(event_stream()), mimetype="text/event-stream")


@app.route('/stream')
def stream():
    def eventStream():
        global newmessages, messagelist, messages
        while newmessages>0:
            latestmessage = messagelist[messages]
            messages+=1
            newmessages-=1
            app.logger.info(str([latestmessage, messagelist, newmessages]))
            yield 'data: {}\n\n'.format(latestmessage)
    return flask.Response(eventStream(), mimetype="text/event-stream")


@app.route('/login', methods=['GET', 'POST'])
def login():
    global usersarr
    if flask.request.method == 'POST':
        flask.session['user'] = flask.request.form['user']
        return flask.redirect('/')
    return flask.render_template('login.html')


@app.route('/post', methods=['POST'])
def post():
    global newmessages, messagelist, messages, sep
    message = flask.request.form['message']
    # sender = flask.request.form['user']
    messagetype = "chess"
    receiver = "ALL"
    user = flask.session.get('user', 'anonymous')
    alllog = open("all.log", "a")
    alllog.write(user + sep +  receiver + sep + messagetype + sep+ message)
    messagelist.append(user + sep +  receiver + sep + messagetype + sep+ message)
    newmessages+=1
    app.logger.info(str(messagelist[-1]))
    app.logger.info(str(newmessages))
    return flask.Response(status=204)


@app.route('/')
def home():
    if 'user' not in flask.session:
        return flask.redirect('/login')
    return flask.render_template("chat.html")% flask.session['user']


if __name__ == '__main__':
    app.debug = True
    app.run(port=8000)