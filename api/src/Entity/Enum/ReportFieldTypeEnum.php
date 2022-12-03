<?php

namespace App\Entity\Enum;

use App\Entity\ReportBasicField;
use App\Entity\ReportField;
use App\Entity\ReportFilterField;
use App\Entity\ReportSelectableField;

enum ReportFieldTypeEnum: string
{
    case shortText = 'short-text';

    case longText = 'long-text';

    case radio = 'radio';

    case checkbox = 'checkbox';

    case select = 'select';

    case date = 'date';

    case time = 'time';

    case file = 'file';

    case recordImport = 'record-import';

    case dashboardImport = 'dashboard-import';

    /**
     * @throws \Exception
     */
    public static function getReportFieldEntityType(string $reportFieldType): ReportField
    {
        return match ($reportFieldType) {
            ReportFieldTypeEnum::shortText->value,
            ReportFieldTypeEnum::longText->value,
            ReportFieldTypeEnum::date->value,
            ReportFieldTypeEnum::time->value,
            ReportFieldTypeEnum::file->value,
            ReportFieldTypeEnum::radio->value => new ReportBasicField(),
            ReportFieldTypeEnum::checkbox->value,
            ReportFieldTypeEnum::select->value => new ReportSelectableField(),
            ReportFieldTypeEnum::recordImport->value,
            ReportFieldTypeEnum::dashboardImport->value => new ReportFilterField(),
            default => throw new \Exception('Unexpected match value'),
        };
    }
}
