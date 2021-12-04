import pygame
import datetime
import time

class Alarm:
    def __init__(self, startTime, endTime):
        self.startTime = startTime
        self.endTime = endTime

    def get_start_time(self):
        x = self.startTime.split(":")
        now = datetime.datetime.now()
        return now.replace(hour=int(x[0]), minute=int(x[1]), second=0, microsecond=0)

    def get_end_time(self):
        x = self.endTime.split(":")
        now = datetime.datetime.now()
        return now.replace(hour=int(x[0]), minute=int(x[1]), second=0, microsecond=0)

# empty list
alarm_list = [Alarm('10:10', '10:15'), Alarm('13:10', '14:00')]

def play_speaker():
    if not pygame.mixer.music.get_busy():
        pygame.mixer.music.load("./Songs/myfile.wav")
        pygame.mixer.music.play()

def stop_speaker():
    pygame.mixer.music.stop()


def should_play_alarm():
    for x in alarm_list:
        if x.get_start_time() < now < x.get_end_time():
            return True
    return False

if __name__ == '__main__':
    starttime = time.time()
    pygame.mixer.init()
    while True:
        print("tick")
        now = datetime.datetime.now()
        if should_play_alarm(): #and weight is positive
            if not pygame.mixer.music.get_busy():
                play_speaker()

        elif pygame.mixer.music.get_busy():
            stop_speaker()
        time.sleep(10.0 - ((time.time() - starttime) % 10.0))
