<?php
class Installation
{
    public $installation_aid;
    public $installation_is_active;
    public $installation_title;
    public $installation_description;
    public $installation_created_at;
    public $installation_updated_at;

    public $employee_aid;

    public $installation_start;
    public $installation_total;
    public $installation_search;

    public $connection;
    public $lastInsertedId;
    public $tblInstallation;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblInstallation = "parrot_installation";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblInstallation} ";
            $sql .= "( installation_title, "; 
            $sql .= "installation_description, ";
            $sql .= "installation_is_active, ";
            $sql .= "installation_created_at, ";
            $sql .= "installation_updated_at ) values ( ";
            $sql .= ":installation_title, "; 
            $sql .= ":installation_description, ";
            $sql .= ":installation_is_active, ";
            $sql .= ":installation_created_at, ";
            $sql .= ":installation_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "installation_title" => $this->installation_title,
                "installation_description" => $this->installation_description,
                "installation_is_active" => $this->installation_is_active,
                "installation_created_at" => $this->installation_created_at,
                "installation_updated_at" => $this->installation_updated_at,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblInstallation} ";
            $sql .= "order by installation_is_active desc, ";
            $sql .= "installation_title asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblInstallation} ";
            $sql .= "order by installation_is_active desc, ";
            $sql .= "installation_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->installation_start - 1,
                "total" => $this->installation_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

     //search
     public function search()
     {
         try {
             $sql = "select ";
             $sql .= "* ";
             $sql .= "from {$this->tblInstallation} ";
             $sql .= "where installation_title like :search ";
             $sql .= "order by installation_is_active desc, ";
             $sql .= "installation_title asc ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                 "search" => "%{$this->installation_search}%",
             ]);
         }  catch (PDOException $ex) {
             $query = false;
         }
         return $query;
         
     }
 

    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblInstallation} ";
            $sql .= "where installation_aid = :installation_aid ";
            $sql .= "order by installation_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "installation_aid" => $this->installation_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblInstallation} set ";
            $sql .= "installation_title = :installation_title, ";
            $sql .= "installation_description = :installation_description, ";
            $sql .= "installation_updated_at = :installation_updated_at ";
            $sql .= "where installation_aid = :installation_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "installation_title" => $this->installation_title,
                "installation_description" => $this->installation_description,
                "installation_updated_at" => $this->installation_updated_at,
                "installation_aid" => $this->installation_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblInstallation} set ";
            $sql .= "installation_is_active = :installation_is_active, ";
            $sql .= "installation_updated_at = :installation_updated_at ";
            $sql .= "where installation_aid = :installation_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "installation_is_active" => $this->installation_is_active,
                "installation_updated_at" => $this->installation_updated_at,
                "installation_aid" => $this->installation_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblInstallation} ";
            $sql .= "where installation_aid = :installation_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "installation_aid" => $this->installation_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
 
    // name
    public function checkName()
    {
        try {
            $sql = "select installation_title from {$this->tblInstallation} ";
            $sql .= "where installation_title = :installation_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "installation_title" => "{$this->installation_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
