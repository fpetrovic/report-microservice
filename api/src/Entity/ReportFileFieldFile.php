<?php

declare(strict_types=1);

namespace App\Entity;

use App\Entity\Trait\IdTrait;
use App\Entity\Trait\SoftDeletableProperties;
use App\Entity\Trait\TimestampableProperties;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToOne;
use Doctrine\ORM\Mapping\Table;
use Symfony\Component\Serializer\Annotation\Groups;

#[Entity]
#[Table(name: 'report_field_file')]
class ReportFileFieldFile
{
    use IdTrait;
    use TimestampableProperties;
    use SoftDeletableProperties;

    #[ManyToOne(targetEntity: ReportFileField::class, inversedBy: 'reportFileFieldFiles')]
    #[JoinColumn(name: 'report_file_id', referencedColumnName: 'id')]
    private ReportFileField $reportFileField;

    #[OneToOne(targetEntity: File::class, cascade: ['persist', 'remove'])]
    #[JoinColumn(name: 'file_id', referencedColumnName: 'id')]
    #[Groups(['baseReport:item:read', 'baseReport:item:write'])]
    private File $file;

    public function getReportFileField(): ReportFileField
    {
        return $this->reportFileField;
    }

    public function setReportFileField(ReportFileField $reportFileField): void
    {
        $this->reportFileField = $reportFileField;
    }

    public function getFile(): File
    {
        return $this->file;
    }

    public function setFile(File $file): void
    {
        $this->file = $file;
    }
}
