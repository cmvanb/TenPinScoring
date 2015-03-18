function ScoreCard(tableElement)
{
    this.tableElement = tableElement;
};

ScoreCard.prototype.updateTable = function(game)
{
    this.clearTable();
    this.addRows(game);
    this.fillRows(game);
};

ScoreCard.prototype.clearTable = function()
{
    while (this.tableElement.rows.length > 0)
    {
        this.tableElement.deleteRow();
    }
};

ScoreCard.prototype.addRows = function(game)
{
    var rowCount = game.frameSets.length + 1;
    var columnCount = _globals.framesPerGame + 1;

    while (this.tableElement.rows.length < rowCount)
    {
        var row = this.tableElement.insertRow(this.tableElement.rows.length);

        for (var i = 0; i < columnCount; ++i)
        {
            row.insertCell(0);
        }
    }
};

ScoreCard.prototype.fillRows = function(game)
{
    var rowCount = game.frameSets.length + 1;
    var columnCount = _globals.framesPerGame + 1;
    var playerNames = game.getPlayerNames();

    for (var r = 0; r < rowCount; ++r)
    {
        var row = this.tableElement.rows[r];

        if (r == 0)
        {
            for (var c = 1; c < columnCount; ++c)
            {
                var cell = row.cells[c];

                cell.innerHTML = c;
            }
        }
        else
        {
            var frameSet = game.frameSets[r - 1];

            for (var c = 0; c < columnCount; ++c)
            {
                var cell = row.cells[c];

                if (c == 0)
                {
                    cell.innerHTML = playerNames[r - 1];
                }
                else if (c > 0)
                {
                    var frame = frameSet.frames[c - 1];

                    cell.innerHTML = getScoreStringFromFrame(frame);
                }
            }
        }
    }
};
