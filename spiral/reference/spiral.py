# Taken from http://nodebox.net/code/index.php/shared_2008-02-26-23-26-39
# Pasting this here because I want to learn from it.
# All credit goes to "Mark M." (See source link)
from nodebox.graphics import BezierPath

class spiral(BezierPath):
    '''A logarithmic spiral beginning at start_x, start_y and spiraling toward the point end_x, end_y. 
       Decay: determines how tightly the spiral turns. Negative values for decay result in the spiral turning
       opposite direction. A value of zero results in a line
       Length: is how many times around the spiril turns.
    '''
    def __init__(self, start_x, start_y, end_x, end_y, decay, length, draw=True, **kwargs):
        from math import sin, cos, pi, e, sqrt, atan2, pow
       
        BezierPath.__init__(self, _ctx,  **kwargs) 
        if  -1e-2 < decay < 1e-2: 
            # very decay of 0 indicates a line
            # but very small decays are practically line ans too small will cause e**1/decay to big = python error
            self.moveto(start_x, start_y )
            self.lineto(end_x, end_y )
            self.inheritFromContext(kwargs.keys())
            if draw:
                self.draw()
            return
        b = 1/float(decay)
        dt = pi/4
        m = 8
        if abs(b) > 1:
            # when the curve gets very flat we need to take a few more samples
            # a better approach might be to simply fit a single cubic curve to the end points
            dt /= abs(b)
        if b < 0:
            #curve reverses    
            dt *= -1
        D = sqrt(pow(start_x-end_x,2) + pow(start_y-end_y,2))
        t =  atan2(start_y-end_y, start_x-end_x)
        a = e**(-b*t)*D
        self.moveto(a*e**(b*t) * cos(t) + end_x, a*e**(b*t) * sin(t) + end_y )

        for i in range(int(length*m)):
            t2 = t - dt
            Dt = t2 -t
            # logarithmic spiral equations 
            x0 = a*e**(b*t) * cos(t) + end_x
            y0 = a*e**(b*t) * sin(t) + end_y 
        
            x3 = a*e**(b*t2) * cos(t2) + end_x
            y3 = a*e**(b*t2) * sin(t2) + end_y
  
            # Derivatives of spiral equation
            dx1 = a*b*e**(b*t) * cos(t) - a*e**(b*t) * sin(t)
            dy1 = a*e**(b*t) * cos(t) + a*b*e**(b*t) * sin(t) 

            dx2 = a*b*e**(b*t2) * cos(t2) - a*e**(b*t2) * sin(t2)
            dy2 = a*e**(b*t2) * cos(t2) + a*b*e**(b*t2) * sin(t2)  
      
            # calculate control points
            x1 = x0 + ((Dt/3.0) * dx1)
            y1 = y0 + ((Dt/3.0) * dy1)
   
            x2 = x3 - ((Dt/3.0) * dx2)
            y2 = y3 - ((Dt/3.0) * dy2)
            t -= dt
            self.curveto(x1, y1, x2, y2, x3, y3)
        self.inheritFromContext(kwargs.keys())
        if draw:
           self.draw()

#### End Spiral Class

size(820, 820)
autoclosepath(close=False)
nofill()
strokewidth(.5)
var("begin_x", NUMBER, 30, 0, WIDTH)
var("begin_y", NUMBER, 200, 0, WIDTH)
var("end_x", NUMBER, 300, 0, WIDTH)
var("end_y", NUMBER, 200, 0, WIDTH)
var("decay", NUMBER, 5, -10, 10)
var("rotations", NUMBER, 2, .25, 5)
p = spiral(begin_x, begin_y, end_x, end_y, decay , rotations, stroke=(.7, .2, .2))