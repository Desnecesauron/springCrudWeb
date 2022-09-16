package com.mstech.dev.examples.crud.entities.enums;

public enum scheduleTimes
{

    eight_nine(8),
    nine_ten(9),
    ten_eleven(10),
    eleven_twelve(11),
    thirteen_fourteen(13),
    fourteen_fifteen(14),
    fifteen_sixteen(15),
    sixteen_seventeen(16),
    seventeen_eighteen(17);

    public final int valueHour;

    scheduleTimes(int x)
    {
        valueHour = x;
    }

}
